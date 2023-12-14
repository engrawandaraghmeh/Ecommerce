import joi from 'joi';
import { GeneralFields } from '../../middleware/validation.js';



export const CreateProduct=joi.object({
    name:joi.string().min(5).max(20).required(),
    description:joi.string().min(2).max(150000),
    stock:joi.number().integer().required(),
    price:joi.number().positive().required(),
    discount:joi.number().positive().min(1),
    /*file:joi.object({
        mainImage:joi.array(),
        subImage:joi.array().items(GeneralFields.file.required()).min(2).max(4),
         }),
         */
    status:joi.string().valid('Active','InActive'),
    categoryId:joi.string().required(),
    subcategoryid:joi.string().required()

    
}).required();

