import { Home12Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { User } from "better-auth";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getUserHouseholds } from "@/global/actions";
import { MAX_HOUSEHOLD_PER_USER } from "@/global/limits";

interface UserHouseholdListProps {
  user: Omit<User, "email" | "emailVerified" | "createdAt" | "updatedAt">;
}

export async function UserHouseholdList({ user }: UserHouseholdListProps) {
  const t = await getTranslations("HomePage");
  const households = await getUserHouseholds(user.id);

  return (
    <div className="w-full">
      {households.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <p className="font-normal self-center">{t("chooseHousehold")}</p>
          <div className="flex flex-col gap-2">
            {households.map(({ household }) => (
              <Link
                key={household.id}
                href={`/${household.id}`}
                data-testid={`household-link-${household.name}`}
              >
                <div className="flex gap-2 bg-primary rounded-lg px-3 py-2">
                  <HugeiconsIcon strokeWidth={2} icon={Home12Icon} />
                  <p className="font-semibold">{household.name}</p>
                </div>
              </Link>
            ))}
          </div>
          {households.length < MAX_HOUSEHOLD_PER_USER && (
            <div className="flex items-center gap-4">
              <div className="h-px bg-foreground w-full"></div>
              <p className="font-normal text-foreground">{t("or")}</p>
              <div className="h-px bg-foreground w-full"></div>
            </div>
          )}
        </div>
      )}
      {households.length < MAX_HOUSEHOLD_PER_USER && (
        <div className="flex flex-col items-center gap-2">
          <p>{t("createHousehold")}</p>
          <Link href="/create" data-testid="create-household-btn">
            <div className="bg-primary p-2 rounded-full">
              <HugeiconsIcon strokeWidth={2} icon={PlusSignIcon} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
