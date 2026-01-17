import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { appendUserToSheet } from "@/lib/sheets";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && user.email && user.name) {
                console.log("Attempting to log user to Sheets:", user.email);
                try {
                    await appendUserToSheet(user.email, user.name);
                    console.log("Successfully logged user to Sheets");
                } catch (err) {
                    console.error("Sheets Logging Error:", err);
                }
            }
            return true;
        },
        async session({ session, token }) {
            return session;
        },
    },
});

export { handler as GET, handler as POST };
