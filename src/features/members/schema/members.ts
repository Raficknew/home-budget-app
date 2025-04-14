import { z } from "zod";

export const membersSchema = z.object({
  name: z.string().min(1),
});

export type MembersSchema = z.infer<typeof membersSchema>;
