import express from "express"
import { categoryPortion , getCategory, updateCategory, deleteCategory} from "../controller/categoriesController.js";

const router = express.Router();
router.post("/create", categoryPortion);
router.get("/allCategories", getCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export {router};