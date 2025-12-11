import { prisma } from "../../prisma/prisma";

interface ListProductsServiceProps {
  disabled?: string;
}

export class ListProductsService {
  async execute({ disabled }: ListProductsServiceProps) {
    try {
      const products = await prisma.product.findMany({
        where: {
          disabled: disabled === "true" ? true : false,
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
      throw new Error("Falha ao buscar produtos");
    }
  }
}
