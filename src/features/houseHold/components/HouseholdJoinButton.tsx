"use client";
import { Button } from "@/components/ui/button";
import { joinHousehold } from "@/features/household/actions/household";


export function HouseholdJoinButton({
  householdId,
  userId,
}: {
  householdId: string;
  userId: string;
}) {
  function handleJoin(householdId: string, userId: string) {
    joinHousehold(householdId, userId);
  }
  return (
    <Button onClick={() => handleJoin(householdId, userId)}>Dołączam</Button>
  );
}
