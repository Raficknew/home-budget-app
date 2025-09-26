"use client";
import { generateLinkForHousehold } from "@/features/household/actions/household";
import { ActionButton } from "@/components/atoms/ActionButton";
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
        className="cursor-pointer text-[12px] hover:underline bg-[#0F0F0F] h-full flex w-full items-center p-2 rounded-lg sm:max-w-[250px] overflow-hidden "
      >
        <p className="font-medium truncate">{link}</p>
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
