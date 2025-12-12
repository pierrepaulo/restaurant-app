import { prisma } from "../../prisma/prisma";

interface ListOrdersServicesProps {
  draft?: string;
}

export class ListOrdersServices {
  async execute({ draft }: ListOrdersServicesProps) {
    const orders = await prisma.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
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
        },
      },
    });

    return orders;
  }
}
