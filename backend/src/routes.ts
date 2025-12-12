import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import multer from "multer";
import uploadConfig from "./config/multer";
import {
  createProductSchema,
  listProductsSchema,
  listProductsByCategorySchema,
} from "./schemas/productSchema";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { createOrderSchema } from "./schemas/orderSchema";
import { ListOrdersController } from "./controllers/order/ListOrdersController";

const router = Router();
const upload = multer(uploadConfig);

//Users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);
router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// Category
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoriesController().handle);

// Products
router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductsController().handle
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductsByCategorySchema),
  new ListProductsByCategoryController().handle
);

// Orders
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle
);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);

export { router };
