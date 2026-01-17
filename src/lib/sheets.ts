import { google } from "googleapis";

export async function appendUserToSheet(email: string, name: string) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        const range = "Sheet1!A:C"; // 가입일시, 이메일, 이름

        const now = new Date();
        const timestamp = now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[timestamp, email, name]],
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error appending to Google Sheets:", error);
        return { success: false, error };
    }
}
