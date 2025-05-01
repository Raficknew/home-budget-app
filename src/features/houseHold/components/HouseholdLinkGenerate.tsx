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
        className="cursor-pointer text-[10px] hover:underline"
      >
        {link.substring(0, 45) + "..."}
      </div>
      <ActionButton
        action={() => generateLinkForHousehold(householdId, inviteId)}
      >
        G
      </ActionButton>
    </div>
  );
}
