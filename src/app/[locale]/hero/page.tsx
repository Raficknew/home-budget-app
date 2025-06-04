import { LanguageSelect } from "@/components/atoms/LanguageSelect";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("HeroPage");

  return (
    <div>
      <h1>Hero Page</h1>
      <Button asChild>
        <Link href={`/${locale}/sign-in`}>{t("join")}</Link>
      </Button>
      <LanguageSelect currentLocale={locale} />
    </div>
  );
}
