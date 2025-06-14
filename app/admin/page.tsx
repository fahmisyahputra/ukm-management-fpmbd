import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">You are logged in as <strong>{session.user?.email}</strong> (Admin)</p>
    </main>
  );
}
