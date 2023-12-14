import {Router} from 'express';
import * as CategoriesController from './categories.controller.js'
import fileUpload, { fileValidation } from '../../services/multer.js';
import subCategoryRouter from './../subcategory/subcategory.router.js'
import { auth } from '../../middleware/auth.js';
import {endpoint} from './category.endpoint.js';
import { validation } from '../../middleware/validation.js';
import * as Validator from './category.validation.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { roles } from '../../middleware/auth.js';
const router=Router();


router.use('/:id/subcategory',subCategoryRouter)


router.post('/',auth(endpoint.create),fileUpload(fileValidation.image).single('image'),validation(Validator.CreateCategory),asyncHandler(CategoriesController.CreateCategory));

router.get('/',auth(Object.values(roles)),asyncHandler(CategoriesController.getCategories));

router.get("/active",auth(endpoint.getActive),asyncHandler(CategoriesController.ActiveCategory));

router.get("/:id",auth(endpoint.specifi),validation(Validator.getCategories),asyncHandler(CategoriesController.getSpecificCategory));

router.put('/:id',auth(endpoint.update),fileUpload(fileValidation.image).single('image'),asyncHandler(CategoriesController.updateCategory));

export default router;