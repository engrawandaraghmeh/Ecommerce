import { Router } from "express";
import * as CartController from './cart.controller.js';
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./cart.endpoint.js";
const router=Router();

router.post('/',auth(endpoint.create),CartController.createCart);
router.patch('/deleteItem',auth(endpoint.delete),CartController.deleteItem);
router.patch('/clear',auth(endpoint.clear),CartController.ClearCart);
router.get('/get',auth(endpoint.get),CartController.getCart)

export default router;