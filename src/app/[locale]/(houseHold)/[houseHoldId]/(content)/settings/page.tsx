import { env } from "@/data/env/server";
import { getHousehold } from "@/global/actions";
import { notFound } from "next/navigation";

export default async function HouseholdEditPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);

  if (household == null) notFound();

  const domain = await env.FRONTEND_URL;

  const link = `http://${domain}/${householdId}/${household?.invite?.link}`;
  return <div>{link}</div>;
}
