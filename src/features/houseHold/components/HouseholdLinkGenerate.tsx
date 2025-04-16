"use client";
import { generateLinkForHousehold } from "../actions/household";
import { ActionButton } from "@/components/ActionButton";

export function HouseholdLinkGenerate({
  householdId,
  url,
  inviteId,
}: {
  householdId: string;
  url: string;
  inviteId: string;
}) {
  const link = `${url}/${householdId}/${inviteId}`;
  return (
    <div className="flex gap-1 items-center">
      <p className="text-xs">{link}</p>
      <ActionButton action={() => generateLinkForHousehold(householdId)}>
        Generate New
      </ActionButton>
    </div>
  );
}
