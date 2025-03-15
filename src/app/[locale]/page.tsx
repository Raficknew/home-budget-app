import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { ExecutorTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk";
import { eq } from "drizzle-orm";
import { HomeIcon, PlusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  return (
    <div className="flex-col min-h-screen gap-2 min-w-screen flex justify-center items-center">
      <Suspense>
        <UserHouseHoldList t={t} locale={locale} />
      </Suspense>
    </div>
  );
}

async function UserHouseHoldList({
  t,
  locale,
}: {
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const { firstName, user } = await getCurrentUser({ allData: true });

  if (user == null) redirect("/en/sign-in");

  const houseHolds = await getUserHouseHolds(user.id);
  return (
    <div className="flex flex-col justify-center items-center max-w-[400px] bg-card p-6 text-center rounded-sm gap-y-5 max-h-[480px] border-foreground border ">
      <div className="flex gap-2">
        <p className="font-light text-2xl">{t("welcome")}</p>
        <p className="font-semibold text-2xl ">{firstName}</p>
      </div>
      {houseHolds.length && (
        <div className="self-stretch">
          <div className="flex flex-col gap-2">
            <p>Wybierz swoje gospodarstwo</p>
            {houseHolds.map(({ role, houseHold }) => (
              <Link href={`/${locale}/${houseHold.id}`} key={houseHold.id}>
                <div className="flex bg-background p-1 rounded-lg self-stretch ">
                  <HomeIcon />
                  <p>{role}</p>
                  <p>{houseHold.name}</p>
                  <p>{houseHold.description}</p>
                </div>
              </Link>
            ))}
            <div className="flex items-center gap-4 mt-5">
              <div className="h-px bg-foreground w-full"></div>
              lub
              <div className="h-px bg-foreground w-full"></div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-2">
        <p>Utwórz gospodarstwo</p>
        <Button
          className="rounded-full size-10 bg-background hover:bg-background hover:border hover:border-accent"
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

function getUserHouseHolds(userId: string) {
  return db.query.ExecutorTable.findMany({
    columns: { role: true },
    where: eq(ExecutorTable.userId, userId),
    with: {
      houseHold: { columns: { id: true, name: true, description: true } },
    },
  });
}
