import { Router } from "express";
import * as CouponController from './coupon.controller.js'
import * as validator from './coupon.validation.js'
import { validation } from "../../middleware/validation.js";
const router=Router();

router.post('/',validation(validator.createCoupon),CouponController.CreateCoupon);

router.get('/',CouponController.GetCoupon)

router.put('/:id',CouponController.UpdateCoupon)

router.patch('/softDelete/:id',CouponController.SoftDelete)

router.delete('/harddel/:id',CouponController.HardDelete)

router.patch('/restore/:id',CouponController.Restore)

export default router;
