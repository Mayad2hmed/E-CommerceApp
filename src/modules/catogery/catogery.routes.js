import express from 'express'
import { addCatogery, deleteCatogery, getAllCategories, getCategoryById, updateCatogery } from './controller/catogery.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCategorySchema, getByIdSchema, updateCategorySchema } from './controller/category.validation.js';
import { uploadSingle } from '../../utilis/fileUpload.js';
const catogeryRoutes=express.Router()
catogeryRoutes.route("/")
            .get(getAllCategories)
            .post(uploadSingle('image'),validation(addCategorySchema),addCatogery)
            
catogeryRoutes.route("/:id")
             .get(validation(getByIdSchema) ,getCategoryById)
             .patch(uploadSingle('image'),validation(updateCategorySchema),updateCatogery)
             .delete(validation(getByIdSchema),deleteCatogery)
export default catogeryRoutes;