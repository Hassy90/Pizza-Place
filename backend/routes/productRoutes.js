import express from "express"
import { items, getProduct , updateProduct, deleteProduct} from "../controller/productController.js";

const router = express.Router();
router.post("/items", items);
router.get("/getProduct", getProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);


export {router};














