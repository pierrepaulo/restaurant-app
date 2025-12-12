import { string, z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O numero da mesa é obrigatorio" })
      .int({ message: "O numero da mesa deve ser um número inteiro" })
      .positive({ message: "O numero da mesa deve ser um numero positivo" }),
    name: string().optional(),
  }),
});
