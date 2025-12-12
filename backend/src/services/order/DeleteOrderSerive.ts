import { prisma } from "../../prisma/prisma";

interface DeleteOrderProps {
  order_id: string;
}

export class DeleteOrderService {
  async execute({ order_id }: DeleteOrderProps) {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Falha ao deletar o pedido");
      }

      await prisma.order.delete({
        where: {
          id: order_id,
        },
      });

      return { message: "Pedido deletado com sucesso" };
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao deletar pedido");
    }
  }
}
