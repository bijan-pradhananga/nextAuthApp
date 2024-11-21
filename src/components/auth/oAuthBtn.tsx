import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { loginViaGitHub, loginViaGoogle } from '../../../action/user'
import { Button } from '../ui/button'
import { CardContent } from '../ui/card'

const OAuthBtn = () => {
  return (
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
  )
}

export default OAuthBtn