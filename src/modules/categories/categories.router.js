import {Router} from 'express';
import * as CategoriesController from './categories.controller.js'
const router=Router();




router.get('/',CategoriesController.getCategories)

export default router;