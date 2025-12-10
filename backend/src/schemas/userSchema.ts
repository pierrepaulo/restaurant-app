import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: "O nome precisa ter 3 letras" }),
    email: z.email({ message: "Precisa ser um email valido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no minimo 6 caracteres" }),
  }),
});
