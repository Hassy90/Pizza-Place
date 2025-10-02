import express from "express"
import { getData, orderData, updateOrder, deleteOrder } from "../controller/orderController.js";

const router = express.Router();
router.post("/getdata", getData);
router.get("/orderdata", orderData);
router.put("/updateorder/:id", updateOrder);
router.delete("/deleteorder/:id", deleteOrder);

export {router};