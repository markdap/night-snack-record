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
                // 백그라운드에서 가입 정보 로깅 (에러가 발생해도 로그인은 진행되도록)
                appendUserToSheet(user.email, user.name).catch(err =>
                    console.error("Sheets Logging Error:", err)
                );
            }
            return true;
        },
        async session({ session, token }) {
            return session;
        },
    },
});

export { handler as GET, handler as POST };
