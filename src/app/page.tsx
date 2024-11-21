import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <form action={async () => {
        "use server"
        await signOut({
          redirectTo: '/login'
        });
      }
      }>
        <Button>Logout</Button>
      </form>

      <br />
      Hello World
    </div>
  );
}
