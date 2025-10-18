import { HozzyLogo } from "@/components/atoms/HozzyLogo";
import { db } from "@/drizzle";
import { MembersTable } from "@/drizzle/schema";
import { MAX_HOUSEHOLD_PER_USER } from "@/global/limits";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Home12Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { eq } from "drizzle-orm";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function HomePage() {
  const locale = await getLocale();
  const session = await auth();

  if (session?.user.id == null) redirect(`${locale}/hero`);

  return (
    <div className="flex justify-center h-screen w-full items-center px-2">
      <HozzyLogo />
      <Suspense>
        <UserHouseholdList
          locale={locale}
          user={{
            id: session.user.id,
            name: session.user.name ?? session.user.google_mail,
          }}
        />
      </Suspense>
    </div>
  );
}

async function UserHouseholdList({
  locale,
  user,
}: {
  locale: string;
  user: { id: string; name: string };
}) {
  const t = await getTranslations("HomePage");
  const households = await getUserHouseholds(user.id);

  return (
    <div className="flex flex-col items-center gap-5 w-[450px]">
      <div
        className={cn(
          "flex flex-col sm:flex-row text-center *:text-3xl",
          user.name.length > 26 && "*:text-2xl"
        )}
      >
        <p className="font-semibold">{t("welcome")},</p>
        <p className="font-normal break-all">{user.name ?? t("user")}!</p>
      </div>
      {households.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <p className="font-normal self-center">{t("chooseHousehold")}</p>
          <div className="flex flex-col gap-2">
            {households.map(({ household }) => (
              <Link key={household.id} href={`/${locale}/${household.id}`}>
                <div className="flex gap-2 bg-accent rounded-lg px-3 py-2">
                  <HugeiconsIcon strokeWidth={2} icon={Home12Icon} />
                  <p className="font-semibold">{household.name}</p>
                </div>
              </Link>
            ))}
          </div>
          {households.length < MAX_HOUSEHOLD_PER_USER && (
            <div className="flex items-center gap-4">
              <div className="h-px bg-foreground/90 w-full"></div>
              <p className="font-normal text-foreground/90">{t("or")}</p>
              <div className="h-px bg-foreground/90 w-full"></div>
            </div>
          )}
        </div>
      )}
      {households.length < MAX_HOUSEHOLD_PER_USER && (
        <div className="flex flex-col items-center gap-2">
          <p>{t("createHousehold")}</p>
          <Link href={`/${locale}/create`}>
            <div className="bg-accent p-2 rounded-full">
              <HugeiconsIcon strokeWidth={2} icon={PlusSignIcon} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

const getUserHouseholds = (userId: string) => {
  return db.query.MembersTable.findMany({
    where: eq(MembersTable.userId, userId),
    with: {
      household: {
        columns: { id: true, name: true },
      },
    },
  });
};
