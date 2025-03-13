import { getCurrentUser } from "@/services/clerk";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="min-h-screen gap-2 min-w-screen flex justify-center items-center">
      <p>{t("title")}</p>
      <Suspense>
        <UserHouseHolds />
      </Suspense>
    </div>
  );
}

async function UserHouseHolds() {
  const { user } = await getCurrentUser({ allData: true });

  return <div>{user?.name}</div>;
}
