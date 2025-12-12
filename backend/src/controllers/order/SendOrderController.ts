import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

export class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, name } = req.body;

    const sendOrder = new SendOrderService();
    const order = await sendOrder.execute({ name: name, order_id: order_id });

    return res.json(order);
  }
}
