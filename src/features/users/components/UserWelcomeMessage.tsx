import type { User } from "better-auth";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

interface UserWelcomeMessageProps {
  user: Omit<User, "email" | "emailVerified" | "createdAt" | "updatedAt">;
}

export async function UserWelcomeMessage({ user }: UserWelcomeMessageProps) {
  const t = await getTranslations("HomePage");

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row text-center *:text-3xl",
        user.name.length > 26 && "*:text-2xl",
      )}
    >
      <p className="font-semibold">{t("welcome")},</p>
      <p className="font-normal break-all">{user.name}!</p>
    </div>
  );
}
