import {Router} from 'express';
import * as ProductsController from './products.controller.js';
const router=Router();




router.get('/',ProductsController.getProducts);

export default router;