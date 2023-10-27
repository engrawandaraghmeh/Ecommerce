import {Router} from 'express';
import * as CategoriesController from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js';
const router=Router();




router.get('/',CategoriesController.getCategories)
router.post('/',fileUpload(fileValidation.image).single('image'),CategoriesController.CreateCategory);

export default router;