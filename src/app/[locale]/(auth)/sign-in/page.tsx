import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/");

  const t = await getTranslations("SignInPage");

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button type="submit">{t("google")}</Button>
      </form>
    </div>
  );
}
