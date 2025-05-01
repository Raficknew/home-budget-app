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
      <div
        onClick={() => navigator.clipboard.writeText(link)}
        className="cursor-pointer text-xs hover:underline"
      >
        {link}
      </div>
      <ActionButton
        action={() => generateLinkForHousehold(householdId, inviteId)}
      >
        Generate New
      </ActionButton>
    </div>
  );
}
