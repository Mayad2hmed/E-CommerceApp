import express from 'express'

import { createReview,  deleteReview, getAllReview, getReviewById, updateReview } from './controller/review.controller.js';
import { protectedRoute } from '../auth/auth.controller.js';
const reviewRoutes=express.Router()
reviewRoutes.route("/")
            .get(getAllReview)
            .post(protectedRoute,createReview)
            
reviewRoutes.route("/:id")
             .get(getReviewById)
             .patch(protectedRoute,updateReview)
             .delete(deleteReview)
export default reviewRoutes;