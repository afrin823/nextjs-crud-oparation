// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@/utils/database";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectToDB();
                    
                    const existingUser = await User.findOne({ email: credentials.email });

                    if (!existingUser) {
                        const newUser = await User.create({
                            name: credentials.email.split('@')[0],
                            email: credentials.email,
                            password: credentials.password,
                        });
                        return { email: newUser.email, name: newUser.name };
                    }

                    if (existingUser.password !== credentials.password) {
                        throw new Error('Invalid password');
                    }

                    return { email: existingUser.email, name: existingUser.name };

                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.email = token.email;
            session.user.name = token.name;
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
