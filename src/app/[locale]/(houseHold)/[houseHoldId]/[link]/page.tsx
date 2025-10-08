import { HozzyLogo } from "@/components/atoms/HozzyLogo";
import { db } from "@/drizzle";
import { HouseholdTable } from "@/drizzle/schema";
import { HouseholdJoinButton } from "@/features/household/components/HouseholdJoinButton";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { validate as validateUuid } from "uuid";

export default async function HouseholdJoinPage({
  params,
}: {
  params: Promise<{ householdId: string; link: string }>;
}) {
  const { householdId, link } = await params;
  const household = await getHouseholdInviteLink(householdId);
  const session = await auth();
  const t = await getTranslations("JoinPage");

  if (
    household == null ||
    household.invite?.link !== link ||
    !session?.user.id
  ) {
    notFound();
  }

  if (household.members.find((u) => u.userId === session.user.id)) {
    redirect(`/${householdId}`);
  }

  return (
    <div className="flex justify-center items-center h-screen px-2">
      <HozzyLogo link />

      <div className="flex flex-col gap-3 w-[450px] text-center">
        <span className="text-3xl text-center">
          {t("title")}
          <p className="font-semibold">{household.name}</p>
        </span>
        <HouseholdJoinButton
          householdId={householdId}
          userId={session.user.id}
          title={t("join")}
        />
      </div>
    </div>
  );
}

const getHouseholdInviteLink = (id: string) => {
  if (!validateUuid(id)) {
    return null;
  }
  return db.query.HouseholdTable.findFirst({
    where: eq(HouseholdTable.id, id),
    with: {
      invite: { columns: { link: true } },
      members: { columns: { userId: true } },
    },
  });
};
