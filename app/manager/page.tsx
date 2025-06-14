import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "clubManager") {
    redirect("/");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Club Manager Dashboard</h1>
      <p className="mt-2">Welcome, {session.user?.email}</p>
    </main>
  );
}
