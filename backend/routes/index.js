import express from "express"
import * as  userRoutes from "./userRoutes.js"
import * as categoriesRoutes from "./categoriesRoutes.js"
import * as productRoutes from "./productRoutes.js"
import * as adminRoutes from "./adminRoutes.js"
import * as orderRoutes from "./orderRoutes.js"

const router = express.Router();
router.use("/run" , userRoutes.router);
router.use("/category", categoriesRoutes.router);
router.use("/product", productRoutes.router);
router.use("/admin", adminRoutes.router);
router.use("/order", orderRoutes.router);

export {router};