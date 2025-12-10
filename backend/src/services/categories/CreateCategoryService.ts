import { prisma } from "../../prisma/prisma";

interface CreateCategoryProps {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: CreateCategoryProps) {
    try {
      const category = await prisma.category.create({
        data: {
          name: name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (err) {
      throw new Error("Falha ao criar categoria");
    }
  }
}
