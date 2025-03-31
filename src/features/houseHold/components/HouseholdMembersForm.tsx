"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HouseholdMembersForm() {
  const [householdId, setHouseholdId] = useState("");
  const [linkId, setLinkId] = useState("");

  useEffect(() => {
    setHouseholdId(crypto.randomUUID());
    setLinkId(crypto.randomUUID());
  }, []);

  const link =
    householdId && linkId ? `localhost:3000/${householdId}/${linkId}` : "";

  function handleSubmit(householdId: string, linkId: string) {
    console.log(householdId, linkId);
  }

  return (
    <div>
      <h4>{link || "Generating link..."}</h4>
      <Button onClick={() => handleSubmit(householdId, linkId)}>Utwórz</Button>
    </div>
  );
}
