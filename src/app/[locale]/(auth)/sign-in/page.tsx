import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
