import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const client = await clerkClient();

export async function getCurrentUser({ allData = false } = {}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return {
    clerkUserId: user.id,
    userId: user.publicMetadata.dbId,
    user:
      allData && user.publicMetadata.dbId != null
        ? await getUser(user.publicMetadata.dbId)
        : undefined,
  };
}

export function syncClerkUserMetadata(user: {
  id: string;
  clerkUserId: string;
}) {
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
    },
  });
}

function getUser(id: string) {
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
