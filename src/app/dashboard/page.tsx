import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
      redirect('/login')
  }
  if (user?.role !== 'admin') {
    return redirect('/login')
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard