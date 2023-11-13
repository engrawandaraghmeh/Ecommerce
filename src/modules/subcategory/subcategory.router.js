import {Router} from 'express';
import * as subCategoriesController from './subcategory.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js';
const router=Router({mergeParams:true});






router.post('/',fileUpload(fileValidation.image).single('image'),subCategoriesController.CreateSubCategory);

router.get('/',subCategoriesController.GetSubCategory)





export default router;