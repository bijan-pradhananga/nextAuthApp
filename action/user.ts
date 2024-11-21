"use server"

import { redirect } from "next/navigation";
import connectDB from "../lib/db";
import { User } from "../models/User";
import { hashPassword } from "../helper/authHelper";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const registerUser = async (formdata: FormData) => {
    const firstName = formdata.get('firstname') as string;
    const lastName = formdata.get('lastname') as string;
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const hashedPassword = await hashPassword(password);
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User Already Exists')
    }
    await User.create({ firstName, lastName, email, password: hashedPassword });
    redirect('/login');
}

const loginUser = async (formdata: FormData): Promise<void> => {
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;

    try {
        const result = await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email,
            password,
        });
    } catch (error) {
        console.error('An error occurred:', error);
        throw error; 
    }
    redirect('/')
};

const loginViaGitHub = async () =>{
    await signIn('github');
}

const loginViaGoogle = async () =>{
    await signIn('google');
}


export { registerUser, loginUser ,loginViaGitHub,loginViaGoogle}