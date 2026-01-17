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
                // Vercel에서 환경변수 입력 시 \n이 \\n으로 들어오는 경우와 실제 줄바꿈인 경우 모두 대응
                private_key: privateKey.replace(/\\n/g, "\n").replace(/"/g, ''),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // 1. 시트 목록을 가져와서 'Sheet1' 또는 '시트1' 또는 첫 번째 시트 찾기
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetName = spreadsheet.data.sheets?.[0]?.properties?.title || "Sheet1";

        // 2. 기존 이메일 목록을 가져와서 중복 체크 (B열)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!B:B`,
        });

        const existingEmails = response.data.values?.flat() || [];
        if (existingEmails.includes(email)) {
            console.log(`User ${email} already exists in Sheets. Skipping.`);
            return { success: true, message: "Already exists" };
        }

        // 3. 중복이 아니면 데이터 추가
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
