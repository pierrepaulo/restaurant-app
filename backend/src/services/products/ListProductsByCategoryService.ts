import { prisma } from "../../prisma/prisma";

interface ListProductsByCategoryServiceProps {
  category_id: string;
}

export class ListProductsByCategoryService {
  async execute({ category_id }: ListProductsByCategoryServiceProps) {
    const category = await prisma.category.findFirst({
      where: { id: category_id },
    });

    if (!category) {
      throw new Error("Categoria nao encontrada");
    }

    try {
      const products = await prisma.product.findMany({
        where: {
          category_id,
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          category_id: true,
          disabled: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: "desc",
        },
      });

      return products;
    } catch (_err) {
      throw new Error("Falha ao buscar produtos da categoria");
    }
  }
}
