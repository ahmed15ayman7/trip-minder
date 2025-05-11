import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrl } from "@/services/api";
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(`${baseUrl}/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (res.data) {
                        return res.data;
                    }
                    return null;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
});

export { handler as GET, handler as POST }; 