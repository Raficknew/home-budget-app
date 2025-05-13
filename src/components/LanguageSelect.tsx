"use client";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect, usePathname } from "@/i18n/navigation";

export function LanguageSelect({
  currentLocale,
  classname,
}: {
  currentLocale: string;
  classname?: string;
}) {
  const languages = routing.locales;
  const pathname = usePathname();

  function changeLanguage(language: string, pathname: string) {
    if (pathname != "/") {
      redirect({ locale: language, href: pathname });
    } else {
      redirect({ locale: language, href: pathname });
    }
  }

  return (
    <div className={`flex items-center gap-2 ${classname}`}>
      <Select
        defaultValue={currentLocale}
        onValueChange={(value) =>
          value != currentLocale && changeLanguage(value, pathname)
        }
      >
        <SelectTrigger className="bg-[#212122]">
          <SelectValue placeholder={currentLocale} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
