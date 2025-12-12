import { prisma } from "../../prisma/prisma";

interface FinishOrderProps {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderProps) {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Falha ao finalizar pedido");
      }

      const updateOrder = await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      });

      return updateOrder;
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao enviar pedido");
    }
  }
}

export { FinishOrderService };
