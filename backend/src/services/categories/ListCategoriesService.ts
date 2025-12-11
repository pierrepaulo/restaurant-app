import { prisma } from "../../prisma/prisma";

export class ListCategoriesService {
  async execute() {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        orderBy: {
          name: "desc",
        },
      });

      return categories;
    } catch (err) {
      throw new Error("Falha ao listar categorias");
    }
  }
}
