"use client";
import { ActionButton } from "@/components/atoms/ActionButton";
import { joinHousehold } from "@/features/household/actions/household";

export function HouseholdJoinButton({
  householdId,
  userId,
  title,
}: {
  householdId: string;
  userId: string;
  title: string;
}) {
  return (
    <ActionButton
      variant="submit"
      action={() => joinHousehold(householdId, userId)}
    >
      {title}
    </ActionButton>
  );
}
