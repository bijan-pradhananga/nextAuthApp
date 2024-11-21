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
import { loginUser} from "../../../../action/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OAuthBtn from "@/components/auth/oAuthBtn";


const Login = async () => {
    const session = await auth();
    const user = session?.user;
    if (user) {
        redirect('/')
    }
    
    return (
        
        <Card className="w-full max-w-md shadow-input">
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
                    <Button type="submit" className="mt-4 w-full -mb-1">Login</Button>
                </form>
            </CardContent>
            <OAuthBtn/>
            <CardFooter className="flex flex-col gap-2">
                <p>Dont have an account? <Link className="font-semibold underline" href={'/register'}>Register</Link></p>
            </CardFooter>
        </Card>
       
    )
}

export default Login