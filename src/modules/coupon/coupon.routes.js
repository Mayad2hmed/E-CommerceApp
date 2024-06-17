import express from 'express'

import { protectedRoute } from '../auth/auth.controller.js';
import { createCoupon, delteCoupon, getAllCoupons, getCouponById, updateCoupon } from './controller/coupon.controller.js';
const couponRoutes=express.Router()
couponRoutes.route("/")
            .get(getAllCoupons)
            .post(protectedRoute,createCoupon)
            
couponRoutes.route("/:id")
             .get(getCouponById)
             .patch(protectedRoute,updateCoupon)
             .delete(delteCoupon)
export default couponRoutes;