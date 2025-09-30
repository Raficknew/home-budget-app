import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components/atoms/PageTitle";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HozzyLogo } from "@/components/atoms/HozzyLogo";

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/");

  const t = await getTranslations("SignInPage");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <HozzyLogo />
      <div className="flex flex-col gap-3 w-[390px] text-center">
        <PageTitle
          title="Cześć!"
          subtitle="Zaloguj się do swojego konta Hozzy"
        />
        <form
          className="flex flex-col gap-3 w-[390px] text-center"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <Button variant="submit" className="px-3 py-2">
            <HugeiconsIcon strokeWidth={2} icon={GoogleIcon} />
            <p className="font-semibold">{t("google")}</p>
          </Button>
        </form>
      </div>
    </div>
  );
}
