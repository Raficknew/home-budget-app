import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;
  return (
    <div>
      <h1>Hero Page</h1>
      {session ? (
        <Link href={{ pathname: `${locale}/dashboard` }}>Dashboard</Link>
      ) : (
        <Link href={{ pathname: `${locale}/sign-in` }}>Sign In</Link>
      )}
    </div>
  );
}
