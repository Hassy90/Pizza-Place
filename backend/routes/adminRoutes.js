import express from "express"
import { adminLogin , checkLogin, updateAdmin} from "../controller/adminController.js";

const router = express.Router();
router.post("/adminlogin", adminLogin);
router.post("/checklogin", checkLogin);
router.put("/updateadmin", updateAdmin);


export {router};