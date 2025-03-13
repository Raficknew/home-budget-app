"use client";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlobeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export function LanguageSelect() {
  const languages = routing.locales;
  const currentLocale = useLocale();

  return (
    <>
      <GlobeIcon />
      <Select onValueChange={(value) => redirect(`/${value}`)}>
        <SelectTrigger>
          <SelectValue placeholder={currentLocale} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <Link key={lang} href={`/${lang}`}>
              <SelectItem value={lang}>{lang}</SelectItem>
            </Link>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
