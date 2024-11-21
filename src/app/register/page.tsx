import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { registerUser } from "../../../action/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Register = async () => {
    const session = await auth();
    const user = session?.user;
    if (user) {
        redirect('/')
    }
    return (
        <Card className="max-w-md shadow-input mt-10 mx-auto">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={registerUser}>
                    <div className="flex flex-col justify-between md:flex-row mb-2 ">
                        <div className="flex flex-col">
                            <Label className="mb-2">First Name</Label>
                            <Input id="firstname" placeholder="Joe" type="text" name="firstname"></Input>
                        </div>
                        <div className="flex flex-col">
                            <Label className="mb-2">Last Name</Label>
                            <Input id="lastname" placeholder="Rossland" type="text" name="lastname"></Input>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <Label className="mb-2">Email</Label>
                        <Input id="email" placeholder="joe@gmail.com" type="text" name="email"></Input>
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label className="mb-2">Password</Label>
                        <Input id="password" placeholder="*************" type="password" name="password"></Input>
                    </div>
                    <Button type="submit"  className="w-full">Sign Up</Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <p>Already have an account? <Link className="font-semibold underline" href={'/login'}>Login</Link></p>
            </CardFooter>
        </Card>
    )
}

export default Register