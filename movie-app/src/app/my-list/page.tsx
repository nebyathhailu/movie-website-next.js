import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import MyListClient from "@/components/MyListClient";

export default async function MyList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return <MyListClient />;
}
