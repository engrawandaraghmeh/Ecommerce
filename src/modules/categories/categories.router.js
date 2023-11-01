import {Router} from 'express';
import * as CategoriesController from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js';
const router=Router();




router.get('/',CategoriesController.getCategories);

router.get("/active",CategoriesController.ActiveCategory);

router.get("/:id",CategoriesController.getSpecificCategory);



router.post('/',fileUpload(fileValidation.image).single('image'),CategoriesController.CreateCategory);



router.put('/:id',fileUpload(fileValidation.image).single('image'),CategoriesController.updateCategory);



export default router;