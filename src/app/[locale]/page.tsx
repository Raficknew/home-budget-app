import { LanguageSelect } from "@/components/LanguageSelect";
import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;
  const t = await getTranslations("HeroPage");

  return (
    <div>
      <h1>Hero Page</h1>
      {session ? (
        <Link href={{ pathname: `${locale}/dashboard` }}>{t("dashboard")}</Link>
      ) : (
        <Link href={{ pathname: `${locale}/sign-in` }}>Sign In</Link>
      )}
      <LanguageSelect currentLocale={locale} />
    </div>
  );
}
