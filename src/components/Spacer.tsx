import { cn } from "@/lib/utils";

export function Spacer({ color }: { color?: string }) {
  return (
    <div
      className={cn(
        "md:w-full md:h-px h-0 w-0 rounded-sm",
        color ? `${color}` : "bg-[#616062] "
      )}
    ></div>
  );
}
