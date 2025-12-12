import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O numero da mesa e obrigatorio" })
      .int({ message: "O numero da mesa deve ser um numero inteiro" })
      .positive({ message: "O numero da mesa deve ser um numero positivo" }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    order_id: z
      .string({ message: "Order deve ser uma string" })
      .min(1, "O id da order e obrigatorio"),
    product_id: z
      .string({ message: "Produto deve ser uma string" })
      .min(1, "O id do produto e obrigatorio"),
    amount: z
      .number()
      .int("Quantidade deve ser um numero inteiro")
      .positive("Quantidade deve ser um numero positivo"),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    item_id: z
      .string({ message: "O id do item deve ser uma string" })
      .min(1, { message: "O id do item e obrigatorio" }),
  }),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({ message: "O id da order deve ser uma string" })
      .min(1, { message: "O id da order e obrigatorio" }),
  }),
});
