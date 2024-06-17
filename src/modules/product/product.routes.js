import express from 'express'
import { validation } from '../../middleware/validation.js';
import { uploadFieldes } from '../../utilis/fileUpload.js';
import {addProduct, delteProduct,getAllProduct, getProductById, updateProduct } from './controller/product.controller.js';
import {getByIdSchema,addProductSchema, updateProductSchema } from './controller/product.validation.js';
const productRouters=express.Router()
productRouters.route("/")
            .get(getAllProduct)
            .post(uploadFieldes([{name:"imgCover",maxCount:1},{name:"images",maxCount:10}]),validation(addProductSchema),addProduct)
            
productRouters.route("/:id")
             .get(validation(getByIdSchema) ,getProductById)
             .patch(uploadFieldes([{feild:"imgCover",maxCount:1},{feild:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
             .delete(validation(getByIdSchema),delteProduct)
export default productRouters;