import { ActionButton } from "@/components/ActionButton";
import { env } from "@/data/env/server";
import { Category } from "@/features/categories/components/Category";
import { CategoryForm } from "@/features/categories/components/CategoryForm";
import { CategoryIconKeys } from "@/features/categories/components/CategoryIcon";
import { deleteHousehold } from "@/features/household/actions/household";
import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { HouseholdLinkGenerate } from "@/features/household/components/HouseholdLinkGenerate";
import { assertHouseholdWriteAccess } from "@/features/household/permissions/household";
import { Member } from "@/features/members/components/Member";
import { MemberForm } from "@/features/members/components/MemberForm";
import { getHousehold } from "@/global/actions";
import { getCategories, getCurrencies, getMembers } from "@/global/functions";
import { notFound } from "next/navigation";

export default async function HouseholdEditPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const { householdId } = await params;
  const household = await getHousehold(householdId);
  const categories = await getCategories(householdId);
  const currencies = await getCurrencies();
  const members = await getMembers(householdId);

  if (household == null || (await assertHouseholdWriteAccess(householdId)))
    notFound();

  return (
    <div className="p-2 flex flex-col gap-10">
      <HouseholdLinkGenerate
        url={env.FRONTEND_URL}
        householdId={householdId}
        inviteId={household.invite?.link ?? ""}
      />
      <div className="w-full">
        Członkowie:
        <MemberForm householdId={householdId} />
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <Member key={member.id} member={member} householdId={householdId} />
          ))}
        </div>
      </div>
      <div>
        <HouseholdForm
          currencies={currencies}
          household={{
            id: household.id,
            currencyCode: household.currencyCode,
            description: household.description ?? "",
            name: household.name,
            balance: 0,
          }}
        />
      </div>
      <div>
        <CategoryForm householdId={householdId} type="fun" />
      </div>
      <div>
        {categories.map((category) => (
          <Category
            key={category.id}
            category={{
              ...category,
              icon: category.icon as CategoryIconKeys,
            }}
            householdId={householdId}
          />
        ))}
      </div>
      <ActionButton
        variant="ghost"
        action={deleteHousehold.bind(null, household.id)}
        requireAreYouSure
      >
        Delete
      </ActionButton>
    </div>
  );
}
