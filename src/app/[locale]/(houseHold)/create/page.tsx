import { db } from "@/drizzle";
import { CurrencyTable } from "@/drizzle/schema";
import { HouseHoldForm } from "@/features/houseHold/components/HouseHoldForm";

export default async function CreateHouseHoldPage() {
  const currencies = await getCurrencies();
  return (
    <div className="flex justify-center h-screen w-full items-center">
      <div className="flex flex-col justify-center grow items-center max-w-[400px] bg-card p-6 text-center rounded-sm gap-y-5 max-h-[480px] border-foreground border ">
        <h1 className="text-2xl">Utwórz nowe gospodarstwo</h1>
        <HouseHoldForm currencies={currencies} />
      </div>
    </div>
  );
}

function getCurrencies() {
  return db.selectDistinct().from(CurrencyTable);
}
