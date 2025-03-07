import { getCurrentUser } from "@/services/clerk";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <Suspense>
        <UserHouseHolds />
      </Suspense>
    </div>
  );
}

async function UserHouseHolds() {
  const { userId, redirectToSignIn, user } = await getCurrentUser({
    allData: true,
  });
  if (userId == null) redirectToSignIn();

  return <div>Gospodarstwa domowe {user?.name}</div>;
}
