import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().min(1),
  type: z.string().min(1),
});

export type CategorySchema = z.infer<typeof categorySchema>;
