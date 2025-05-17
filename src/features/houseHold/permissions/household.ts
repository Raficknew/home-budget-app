import { getHousehold } from "@/global/actions";
import { auth } from "@/lib/auth";

export async function assertHouseholdWriteAccess(householdId: string) {
  const session = await auth();
  const user = session?.user;
  const household = await getHousehold(householdId);

  if (user && user.id == household?.ownerId) {
    return;
  }

  throw "NotAllowedToWriteHouseholdExeption";
}

export async function canAccessHouseholdSettings(householdId: string) {
  const session = await auth();
  const user = session?.user;
  const household = await getHousehold(householdId);

  if (user && user.id == household?.ownerId) {
    return true;
  }

  return false;
}
