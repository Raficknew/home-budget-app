import { getCurrentUser } from "@/services/clerk";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
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
  const { user, userId } = await getCurrentUser({ allData: true });

  if (userId == null) redirect("/sign-in");

  return <div>{user?.name}</div>;
}
