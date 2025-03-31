"use client";

import { useCreateHouseHoldStore } from "@/app/[locale]/(houseHold)/create/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { insertHousehold } from "../actions/households";
import { useLocale } from "next-intl";

export function HouseholdMembersForm() {
  const locale = useLocale();
  const [householdId, setHouseholdId] = useState("");
  const [linkId, setLinkId] = useState("");
  const router = useRouter();

  const householdName = useCreateHouseHoldStore((state) => state.name);
  const description = useCreateHouseHoldStore((state) => state.description);
  const currencyCode = useCreateHouseHoldStore((state) => state.currencyCode);
  const balance = useCreateHouseHoldStore((state) => state.balance);

  useEffect(() => {
    if (!useCreateHouseHoldStore.persist.hasHydrated) return;

    if (!householdName || !currencyCode) {
      router.push("/create/general");
    }

    if (!balance) {
      router.push("/create/balance");
    }

    if (householdId == "" && linkId == "") {
      setHouseholdId(crypto.randomUUID());
      setLinkId(crypto.randomUUID());
    }
  }, [
    useCreateHouseHoldStore.persist.hasHydrated,
    householdName,
    currencyCode,
    balance,
    householdId,
    linkId,
    router,
  ]);

  const link =
    householdId && linkId ? `localhost:3000/${householdId}/${linkId}` : "";

  function handleSubmit(householdId: string, linkId: string) {
    if (
      householdId &&
      linkId &&
      householdName &&
      description &&
      currencyCode &&
      balance
    ) {
      insertHousehold(
        {
          householdId,
          balance,
          currencyCode,
          description,
          linkId,
          name: householdName,
        },
        locale
      );
    }
  }

  return (
    <div>
      <h4>{link || "Generating link..."}</h4>
      <Button onClick={() => handleSubmit(householdId, linkId)}>Utwórz</Button>
    </div>
  );
}
