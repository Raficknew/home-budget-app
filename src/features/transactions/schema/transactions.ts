import { z } from "zod";

export const transactionsSchema = z.object({
  price: z.coerce.number().min(0),
  type: z.enum(["income", "expense"]),
  name: z.string().min(3),
  membersIds: z.string().min(1),
  date: z.date(),
  categoryId: z.string().min(1),
});

export type TransactionsSchema = z.infer<typeof transactionsSchema>;
