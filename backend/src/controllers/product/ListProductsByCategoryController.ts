import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/products/ListProductsByCategoryService";

export class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listProductsByCategory = new ListProductsByCategoryService();

    const products = await listProductsByCategory.execute({ category_id });

    return res.status(200).json(products);
  }
}
