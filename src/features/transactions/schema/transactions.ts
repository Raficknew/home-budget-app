import { z } from "zod";

export const transactionsSchema = z.object({
  price: z.coerce.number().min(0),
  type: z.string().min(1),
  name: z.string().min(3),
  memberId: z.string().min(1),
  date: z.date(),
  categoryId: z.string().min(1),
});

export type TransactionsSchema = z.infer<typeof transactionsSchema>;
