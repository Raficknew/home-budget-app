import { z } from "zod";

export const usersSchema = z.object({
  name: z.string().min(3).max(35),
});

export type UsersSchema = z.infer<typeof usersSchema>;
