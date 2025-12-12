import { prisma } from "../../prisma/prisma";

interface ItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddItemOrderService {
  async execute({ order_id, product_id, amount }: ItemProps) {
    try {
      const orderExists = await prisma.order.findFirst({
        where: {
          id: order_id,
        },
      });
      if (!orderExists) {
        throw new Error("Order nao encontrada");
      }

      const productExists = await prisma.product.findFirst({
        where: {
          id: product_id,
          disabled: false,
        },
      });
      if (!productExists) {
        throw new Error("Produto não encontrada");
      }

      const item = await prisma.item.create({
        data: {
          order_id: order_id,
          product_id: product_id,
          amount: amount,
        },
        select: {
          id: true,
          amount: true,
          order_id: true,
          product_id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao adicionar item no pedido");
    }
  }
}
