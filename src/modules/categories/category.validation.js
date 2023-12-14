import joi from 'joi';
import { GeneralFields } from '../../middleware/validation.js';
export const CreateCategory=joi.object({

    name:joi.string().min(5).max(20).required(),
     file:GeneralFields.file.required()
   //file:joi.array.items(GeneralFields.file.required()).required()
    
})

export const getCategories=joi.object({
  id:joi.string().min(24).max(24).required()
});
