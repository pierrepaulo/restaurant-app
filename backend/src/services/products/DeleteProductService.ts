import { prisma } from "../../prisma/prisma";

interface DeleteProductServiceProps {
  product_id: string;
}

export class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prisma.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
        },
      });
      return { message: "Produto deletado/arquivado com sucesso!" };
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao deletar o produtor");
    }
  }
}
