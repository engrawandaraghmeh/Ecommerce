import joi from 'joi';
import { GeneralFields } from '../../middleware/validation.js';

export const createCoupon=joi.object({
    name:joi.string().min(1).max(25).required(),
    amount:joi.number().positive(),
    expireDate:joi.date().greater('now').required()

})