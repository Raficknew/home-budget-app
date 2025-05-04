import { DialogTrigger } from "@/components/ui/dialog";
import { Category } from "@/features/categories/components/Category";
import { CategoryForm } from "@/features/categories/components/CategoryForm";
import { CategoryIconKeys } from "@/features/categories/components/CategoryIcon";
import { HouseholdForm } from "@/features/household/components/HouseholdGeneralForm";
import { assertHouseholdWriteAccess } from "@/features/household/permissions/household";
import { Member } from "@/features/members/components/Member";
import { MemberAddDialog } from "@/features/members/components/MemberAddDialog";
import { getHousehold } from "@/global/actions";
import { getCategories, getCurrencies, getMembers } from "@/global/functions";
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
    <div className="flex flex-col gap-8">
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
          inputBgColor="bg-[#161616]"
        />
      </div>
      <SectionSpacer />
      <div className="flex flex-col gap-5">
        <SectionHeader
          title="Członkowie"
          description="Dodawaj, usuwaj i edytuj członków gospodarstwa"
        />
        <div className="grid grid-cols-4 gap-2">
          {members.map((member) => (
            <Member key={member.id} member={member} householdId={householdId} />
          ))}
          {members.length !== 8 && (
            <MemberAddDialog householdId={householdId}>
              <DialogTrigger className="flex flex-col items-center justify-center h-[184px] rounded-lg ring ring-accent cursor-pointer">
                <HugeiconsIcon
                  className="size-12 text-accent"
                  icon={PlusSignCircleIcon}
                />
              </DialogTrigger>
            </MemberAddDialog>
          )}
        </div>
      </div>

      {/* <div>
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
      </div> */}
    </div>
  );
}

function SectionSpacer() {
  return <div className="bg-[#616062] w-full h-px"></div>;
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-medium">{title}</h2>
      <h4 className="text-xs text-[#828183]">{description}</h4>
    </div>
  );
}
