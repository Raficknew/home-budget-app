import { Logout05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <div className="cursor-pointer self-center" onClick={() => signOut()}>
      <HugeiconsIcon
        strokeWidth={2}
        width={20}
        height={20}
        icon={Logout05Icon}
      />
    </div>
  );
}
