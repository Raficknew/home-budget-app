import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import { MembersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { HomeIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <div className="flex justify-center h-screen w-full items-center">
      <Suspense>
        <UserHouseHoldList t={t} locale={locale} />
      </Suspense>
    </div>
  );
}

function UserHouseHoldList({
  t,
  locale,
}: {
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const { data } = useSession();

  return (
    <div className="flex flex-col justify-center grow items-center max-w-[400px] bg-card p-6 text-center rounded-sm gap-y-5 max-h-[480px] border-foreground border ">
      <div className="flex gap-2 pb-18">
        <h1 className="font-light text-2xl">{t("welcome")}</h1>
        <p className="font-semibold text-2xl ">{data.user.name ?? t("user")}</p>
      </div>
      {/* {houseHolds.length > 0 && (
        <div className="self-stretch">
          <div className="flex flex-col gap-2 text-left">
            <h4 className="pl-1">{t("chooseHouseHold")}</h4>
            {houseHolds.map(({ houseHold }) => (
              <Link href={`/${locale}/${houseHold.id}`} key={houseHold.id}>
                <div className="flex justify-between items-center bg-background py-2 px-3 rounded-lg self-stretch hover:shadow hover:shadow-accent">
                  <div className="flex items-center gap-2">
                    <HomeIcon size={20} strokeWidth={1.15} color="#0EF6CC" />
                    <p>{houseHold.name}</p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="flex items-center gap-5 mt-5">
              <div className="h-px bg-foreground w-full"></div>
              {t("or")}
              <div className="h-px bg-foreground w-full"></div>
            </div>
          </div>
        </div>
      )} */}
      <div
        className="flex flex-col items-center gap-2 pb-18
      "
      >
        <h4>{t("createHouseHold")}</h4>
        <Button
          className="rounded-full size-10 bg-background hover:bg-background hover:shadow hover:shadow-accent"
          asChild
        >
          <Link href={`/${locale}/create`}>
            <PlusIcon className="text-accent" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

const getUserHouseHolds = (userId: string) => {
  return db.query.MembersTable.findMany({
    where: eq(MembersTable.userId, userId),
    with: {
      houseHold: {
        columns: { id: true, name: true },
      },
    },
  });
};
