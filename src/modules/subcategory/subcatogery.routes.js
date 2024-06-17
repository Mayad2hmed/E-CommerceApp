import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadSingle } from '../../utilis/fileUpload.js';
import { addSubCategory, deletSubCategory, getAllSubCategories, updateSubCategory } from './controller/subcatogery.controller.js';
import {addSubCategorySchema,updateSubCategorySchema, getByIdSchema } from '../subcategory/controller/subcategory.validation.js';
const subcatogeryRoutes=express.Router({mergeParams:true})
subcatogeryRoutes.route("/")
            .get(getAllSubCategories)
            .post(uploadSingle('image'),validation(addSubCategorySchema),addSubCategory)

subcatogeryRoutes.route("/:id")
             .get(validation(getByIdSchema) ,getAllSubCategories)
             .patch(uploadSingle('image'),validation(updateSubCategorySchema),updateSubCategory)
             .delete(validation(getByIdSchema),deletSubCategory)
export default subcatogeryRoutes;