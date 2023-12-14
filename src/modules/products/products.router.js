import {Router} from 'express';
import * as ProductsController from './products.controller.js';
import { auth } from '../../middleware/auth.js';
import { endpoint } from './product.endpoint.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
import * as validator from './product.validation.js'
import { validation } from '../../middleware/validation.js';
const router=Router();




router.get('/',ProductsController.getProducts);
router.post('/',auth(endpoint.create),fileUpload(fileValidation.image).fields([
   { name:'mainImage',maxCount:1},
   { name:'subImage',maxCount:4},
]),validation(validator.CreateProduct),
ProductsController.createProduct)

export default router;