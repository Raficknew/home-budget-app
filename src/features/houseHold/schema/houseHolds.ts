import { z } from "zod";

export const houseHoldSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().max(30),
  currencyCode: z.string().length(3),
});
