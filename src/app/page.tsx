import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { HozzyLogo } from "@/components/atoms/HozzyLogo";
import { Skeleton } from "@/components/ui/skeleton";
import { UserHouseholdList } from "@/features/users/components/UserHouseholdList";
import { UserWelcomeMessage } from "@/features/users/components/UserWelcomeMessage";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Hozzy",
  description: "Choose or create a household.",
};

export default async function HomePage() {
  return (
    <main className="flex justify-center h-screen w-full items-center px-2">
      <HozzyLogo variant="withText" size={90} />
      <article className="flex flex-col items-center gap-5 w-112.5">
        <Suspense fallback={<Skeleton className="w-full h-[350px]" />}>
          <HomePageContent />
        </Suspense>
      </article>
    </main>
  );
}

async function HomePageContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.id == null) redirect(`/hero`);

  return (
    <>
      <ViewTransition>
        <UserWelcomeMessage
          user={{
            id: session.user.id,
            name: session.user.name ?? session.user.email,
          }}
        />
      </ViewTransition>
      <Suspense fallback={<Skeleton className="w-full h-[250px]" />}>
        <ViewTransition>
          <UserHouseholdList
            user={{
              id: session.user.id,
              name: session.user.name ?? session.user.email,
            }}
          />
        </ViewTransition>
      </Suspense>
    </>
  );
}
