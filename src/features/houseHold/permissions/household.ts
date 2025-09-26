import { getHousehold } from "@/global/actions";
import { auth } from "@/lib/auth";

export async function assertHouseholdWriteAccess(householdId: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw "UserNotFound";
  }

  const household = await getHousehold(householdId);

  if (!household) {
    throw "HouseholdNotFound";
  }

  const isOwner = user && user.id === household?.ownerId;
  const isMember = user && household?.members.find((u) => u.userId == user.id);

  if (isOwner || isMember) {
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
