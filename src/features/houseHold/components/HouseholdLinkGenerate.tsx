"use client";
import { generateLinkForHousehold } from "../actions/household";
import { ActionButton } from "@/components/ActionButton";
import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
        className="cursor-pointer text-[12px] hover:underline bg-[#0F0F0F] h-full flex w-full items-center p-2 rounded-lg"
      >
        <p className="font-medium">{link.substring(0, 45) + "..."}</p>
      </div>
      <ActionButton
        variant="submit"
        className="size-9"
        action={() => generateLinkForHousehold(householdId, inviteId)}
      >
        <HugeiconsIcon
          strokeWidth={3}
          width={20}
          height={20}
          icon={ArrowReloadHorizontalIcon}
        />
      </ActionButton>
    </div>
  );
}
