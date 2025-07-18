import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string(),
  password: z
    .string()
    .min(8)
    .regex(/[a-zA-Z]/, { message: "Contém pelo menos uma letra." })
    .regex(/[0-9]/, {
      message: "Contem pelo menos um número.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contem pelo menos um caracter especial.",
    })
    .trim(),
});