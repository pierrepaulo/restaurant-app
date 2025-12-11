import { Request, Response } from "express";
import { ListProductsService } from "../../services/products/ListProductsService";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disabled as string | undefined;

    const listPoducts = new ListProductsService();

    const products = await listPoducts.execute({
      disabled: disabled,
    });

    return res.json(products);
  }
}
