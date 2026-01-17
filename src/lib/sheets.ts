import { google } from "googleapis";

export async function appendUserToSheet(email: string, name: string) {
    const emailAddr = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!emailAddr || !privateKey || !spreadsheetId) {
        console.error("Missing Google Sheets environment variables:", {
            hasEmail: !!emailAddr,
            hasKey: !!privateKey,
            hasId: !!spreadsheetId
        });
        return { success: false, error: "Missing config" };
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: emailAddr,
                private_key: privateKey.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const range = "Sheet1!A:C";

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
        console.error("Detailed Error appending to Google Sheets:", error);
        throw error; // Let the caller catch it
    }
}
