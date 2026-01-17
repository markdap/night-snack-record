import { google } from "googleapis";

export async function appendUserToSheet(email: string, name: string) {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
        console.error("Missing Google Sheets environment variables");
        return { success: false, error: "Missing config" };
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: serviceAccountEmail,
                private_key: privateKey.replace(/\\n/g, "\n").replace(/"/g, ''),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // 1. 시트 이름 감지
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetName = spreadsheet.data.sheets?.[0]?.properties?.title || "Sheet1";

        // 2. 헤더 확인 및 설정 (A1:C1)
        const headerCheck = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:C1`,
        });

        const headers = ["가입일시", "계정", "사용자명"];
        const currentHeaders = headerCheck.data.values?.[0] || [];

        // 헤더가 없거나 다르면 설정 (첫 번째 데이터가 헤더 위치를 차지하고 있을 수 있으므로 주의)
        if (JSON.stringify(currentHeaders) !== JSON.stringify(headers)) {
            // 만약 첫 줄에 데이터가 있다면 (이메일 형식이 있다면) 한 줄 아래로 밀지 않고 
            // 사용자의 요청대로 헤더를 강제 삽입합니다. 
            // (기존 데이터가 1번줄에 있다면 수동으로 옮기셔야 할 수 있습니다)
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${sheetName}!A1:C1`,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [headers],
                },
            });
            console.log("Headers initialized in row 1");
        }

        // 3. 중복 체크 (B2:B 범위에서 이메일 검색)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!B:B`,
        });

        const existingEmails = response.data.values?.flat() || [];
        if (existingEmails.includes(email)) {
            console.log(`User ${email} already exists. Skipping.`);
            return { success: true, message: "Already exists" };
        }

        // 4. 데이터 추가
        const now = new Date();
        const timestamp = now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${sheetName}!A:C`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[timestamp, email, name]],
            },
        });

        console.log(`Successfully added new user: ${email}`);
        return { success: true, message: "New user added" };
    } catch (error) {
        console.error("Detailed Error in appendUserToSheet:", error);
        throw error;
    }
}
