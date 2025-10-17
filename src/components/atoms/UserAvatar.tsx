import { User02FreeIcons } from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";

export function UserAvatar({
  image,
  size = 40,
}: {
  image: string | null;
  size?: number;
}) {
  return (
    <div className="cursor-pointer flex justify-center">
      <Avatar style={{ width: `${size}px`, height: `${size}px` }}>
        <AvatarImage src={image ?? ""} />
        <AvatarFallback className="bg-accent">
          <HugeiconsIcon icon={User02FreeIcons} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
