"use client";
import { Button } from "@/components/ui/button";
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
  function handleJoin(householdId: string, userId: string) {
    joinHousehold(householdId, userId);
  }
  return (
    <Button variant="submit" onClick={() => handleJoin(householdId, userId)}>
      {title}
    </Button>
  );
}
