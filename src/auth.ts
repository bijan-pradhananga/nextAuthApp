import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import connectDB from "../lib/db";
import { User } from "../models/User";
import { comparePass } from "../helper/authHelper";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        firstName?: string,
        lastName?: string,
        role: string
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        role?: string
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;
                if (!email || !password) {
                    throw new CredentialsSignin({ cause: 'Please provide both credentials' })
                }
                await connectDB()
                const user = await User.findOne({ email }).select("+password +role");
                if (!user) {
                    throw new Error('Invalid Email Or Password');
                }
                const isMatched = await comparePass(password, user.password);
                if (!isMatched) {
                    throw new Error('Invalid Password');
                }
                const userData = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                }
                return userData;
            }
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.sub && token?.role) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        signIn: async ({ user, account }) => {
            if (account?.provider === 'google') {
                try {
                    const { email, name, id } = user;
                    if (name) {
                        const [firstName, ...lastNameArr] = name.split(' ');
                        const lastName = lastNameArr.join(' '); 
                        await connectDB()
                        const alreadyUser = await User.findOne({ email });
                        if (!alreadyUser) {
                            await User.create({
                                email,
                                firstName,
                                lastName,
                                authProviderId: id
                            });
                        } else {
                            console.log('User already exists:', alreadyUser);
                            return true;
                        }
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error("Error while creating user");
                }
            }
            if (account?.provider === 'credentials') {
                return true;
            } else {
                return false;
            }
        }
    },
    debug: true,
})