import { getHousehold } from "@/global/actions";
import { auth } from "@/lib/auth";

export async function canMakeChangesToHousehold(householdId: string) {
  const session = await auth();
  const household = await getHousehold(householdId);
  return household?.ownerId === session?.user.id;
}
