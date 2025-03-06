import { SignInButton } from "@clerk/nextjs";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense>
      <SignInButton>Sign in</SignInButton>
    </Suspense>
  );
}
