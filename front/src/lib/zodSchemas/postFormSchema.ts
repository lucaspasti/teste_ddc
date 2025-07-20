import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório")
    .max(255, "O título deve ter no máximo 255 caracteres"),

  content: z
    .string()
    .max(5000, "O conteúdo deve ter no máximo 5000 caracteres")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  authorId: z.number(),

  published: z.boolean().optional().default(true),
});
export type PostSchemaType = z.infer<typeof PostSchema>;