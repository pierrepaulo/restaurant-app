import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

export class RemoveItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const removeItemService = new RemoveItemService();

    const result = await removeItemService.execute({ item_id });

    return res.status(200).json(result);
  }
}
