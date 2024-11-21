import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { loginUser, loginViaGitHub, loginViaGoogle } from "../../../action/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


const Login = async () => {
    const session = await auth();
    const user = session?.user;
    if (user) {
        redirect('/')
    }
    
    return (
        <Card className="max-w-md shadow-input mt-10 mx-auto">
            <CardHeader>
                <CardTitle>Login to your Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={loginUser}>
                    <div className="flex flex-col mb-2">
                        <Label className="mb-2">Email</Label>
                        <Input id="email" placeholder="joe@gmail.com" type="text" name="email"></Input>
                    </div>
                    <div className="flex flex-col">
                        <Label className="mb-2">Password</Label>
                        <Input id="password" placeholder="*************" type="password" name="password"></Input>
                    </div>
                    <Button type="submit" className="mt-4 w-full">Login</Button>
                </form>
            </CardContent>
            <CardContent>
                <p className="text-center font-semibold text-gray-500 text-sm mb-2 uppercase">Or Continue With</p>
                <div className="flex flex-row gap-4">
                    <form className="flex-1"  action={loginViaGoogle}>
                        <Button className="flex items-center bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 w-full">
                            <FaGoogle/>
                            <span>Google</span>
                        </Button>
                    </form>
                    <form className="flex-1" action={loginViaGitHub}>
                        <Button className="w-full flex items-center bg-gray-100 text-black hover:bg-gray-200 px-4 py-2">
                            <FaGithub />
                            <span>GitHub</span>
                        </Button>
                    </form>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <p>Dont have an account? <Link className="font-semibold underline" href={'/register'}>Register</Link></p>
            </CardFooter>
        </Card>
    )
}

export default Login