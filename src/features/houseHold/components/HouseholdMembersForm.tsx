import { createUuid } from "@/global/functions";

export function HouseholdMembersForm() {
  const householdId: string = createUuid();
  const link: string = createUuid();
  return <div>Link: {"localhost:3000/" + householdId + "/" + link}</div>;
}
