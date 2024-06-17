import express from 'express'
import { validation } from '../../middleware/validation.js';
import { changePassword, createUser, deletUser, getAllUser, getUserById, updateUser } from './controller/user.controller.js';
const userRoutes=express.Router()
userRoutes.route("/")
            .get(getAllUser)
            .post(createUser)
            
userRoutes.route("/:id")
             .get(getUserById)
             .patch(updateUser)
             .delete(deletUser)
userRoutes.patch("/changePassword/:id",changePassword)


export default userRoutes;