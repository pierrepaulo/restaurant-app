import { prisma } from "../../prisma/prisma";

interface SendOrderProps {
  name: string;
  order_id: string;
}

export class SendOrderService {
  async execute({ name, order_id }: SendOrderProps) {
    try {
      const order = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });
      if (!order) {
        throw new Error("Falha ao enviar pedido");
      }
      const updateOrder = await prisma.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name: name,
        },
        select: {
          id: true,
          table: true,
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
