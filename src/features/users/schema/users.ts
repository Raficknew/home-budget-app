import { z } from "zod";

export const usersSchema = z.object({
  name: z.string().min(3),
});

export type UsersSchema = z.infer<typeof usersSchema>;
