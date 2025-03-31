import { HouseHoldSchema } from "@/features/houseHold/schema/households";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreateHouseholdState = Partial<HouseHoldSchema> & {
  setData: (data: Partial<HouseHoldSchema>) => void;
};

export const useCreateHouseHoldStore = create(
  persist<CreateHouseholdState>(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "create-household-store",
    }
  )
);
