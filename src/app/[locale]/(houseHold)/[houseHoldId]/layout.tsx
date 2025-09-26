import { getHousehold } from "@/global/functions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ householdId: string }>;
}) {
  const session = await auth();

  if (session == null) redirect(`/sign-in`);

  const { householdId } = await params;

  if (householdId == null) redirect(`/`);

  const household = await getHousehold(householdId);

  if (
    household == null ||
    !household?.members.find((member) => member.userId === session.user.id)
  )
    redirect(`/`);

  return <>{children}</>;
}
