"use client";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

export function RouteBackButton() {
  const router = useRouter();
  return (
    <div className="flex sm:hidden" onClick={() => router.back()}>
      <HugeiconsIcon icon={ArrowLeft01Icon} />
    </div>
  );
}
