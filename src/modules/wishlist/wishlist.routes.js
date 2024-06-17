import express from 'express'

import { addToWishList} from './controller/wishlist.controller.js';
import { protectedRoute } from '../auth/auth.controller.js';
const wishlistRoutes=express.Router()
wishlistRoutes.route("/").patch(protectedRoute,addToWishList)

           

export default wishlistRoutes;