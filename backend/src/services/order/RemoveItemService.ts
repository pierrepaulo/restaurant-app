import { prisma } from "../../prisma/prisma";

interface RemoveItemServiceProps {
  item_id: string;
}

export class RemoveItemService {
  async execute({ item_id }: RemoveItemServiceProps) {
    const item = await prisma.item.findFirst({
      where: {
        id: item_id,
      },
    });

    if (!item) {
      throw new Error("Item nao encontrado");
    }

    try {
      await prisma.item.delete({
        where: {
          id: item_id,
        },
      });

      return { message: "Item removido com sucesso" };
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao remover item");
    }
  }
}
