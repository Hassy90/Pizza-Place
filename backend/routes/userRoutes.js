import express from "express"
import { header, getHeader } from "../controller/userController.js";


const router = express.Router();
router.post("/header", header);
router.get("/getheader", getHeader);


export {router};