import { Router } from "express";
import * as AuthController from './auth.controller.js';
import fileUpload,{fileValidation} from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router=Router();


router.post('/signup',fileUpload(fileValidation.image).single('image'),asyncHandler(AuthController.signup));
router.post('/signin',asyncHandler(AuthController.signin));
router.get('/confirmEmail/:token',asyncHandler(AuthController.ConfirmEmail));


export default router;