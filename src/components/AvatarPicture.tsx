import { Session } from "next-auth";
import { User02FreeIcons } from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";

export async function AvatarPicture({
  session,
  size = 20,
}: {
  session: Session | null;
  size?: number;
}) {
  return (
    <div className="cursor-pointer flex justify-center">
      <Avatar className={`size-[${size}]`}>
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback className="bg-accent">
          <HugeiconsIcon icon={User02FreeIcons} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
