import z from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "O nome do produto é obrigatorio" }),
    price: z.string().min(1, { message: "O valor do produto é obrigatorio" }),
    description: z
      .string()
      .min(1, { message: "A descrição do produto é obrigatorio" }),
    category_id: z.string({ message: "A categoria do produto é obrigatorio" }),
  }),
});

export const listProductsSchema = z.object({
  query: z.object({
    disabled: z.string().optional(),
  }),
});

export const listProductsByCategorySchema = z.object({
  query: z.object({
    category_id: z.string({ message: "O ID da categoria é obrigatorio" }),
  }),
});
