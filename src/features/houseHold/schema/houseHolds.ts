import { z } from "zod";

export const houseHoldSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(5).max(30),
  currencyCode: z.string().min(3).max(3),
});
