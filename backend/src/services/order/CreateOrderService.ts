import { prisma } from "../../prisma/prisma";

interface CreateOrderServiceProps {
  table: number;
  name: string;
}

export class CreateOrderService {
  async execute({ table, name }: CreateOrderServiceProps) {
    try {
      const order = await prisma.order.create({
        data: {
          table: table,
          name: name ?? "",
        },
        select: {
          id: true,
          table: true,
          status: true,
          draft: true,
          name: true,
          createdAt: true,
        },
      });

      return order;
    } catch (_err) {
      throw new Error("Falha ao criar pedido");
    }
  }
}
