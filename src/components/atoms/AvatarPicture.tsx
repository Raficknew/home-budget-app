import { User02FreeIcons } from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";

export async function AvatarPicture({
  image,
  size = 20,
}: {
  image: string | null;
  size?: number;
}) {
  return (
    <div className="cursor-pointer flex justify-center">
      <Avatar className={`size-${size}`}>
        <AvatarImage src={image ?? ""} />
        <AvatarFallback className="bg-accent">
          <HugeiconsIcon icon={User02FreeIcons} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
