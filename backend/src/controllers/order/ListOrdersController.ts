import { Request, Response } from "express";
import { ListOrdersServices } from "../../services/order/ListOrdersService";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;

    const listOrders = new ListOrdersServices();

    const orders = await listOrders.execute({
      draft: draft,
    });

    return res.json(orders);
  }
}
