import slugify from "slugify"
import subCatogeryModel from "../../../../db/models/catogery.model.js"
import { handelError } from "../../../middleware/handelError.js"
import { deleteOne } from "../../handlers/apiHandler.js"

const addSubCategory=handelError(async(req,res)=>{
 req.body.slug=slugify(req.body.title)
 req.body.image=req.file.filename
 let preSubCatogery=new subCatogeryModel(req.body)
 let addSubCategory=await preSubCatogery.save()
 res.json({message:"sucsses",addSubCategory})
})
const getAllSubCategories=handelError(async(req,res)=>{
    let filter={}
    if(req.params&&req.params.id){
        filter={
            category:req.params.id
        }
    }
    let apiFeature=new ApiFeature(subCatogeryModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",result})
})
const getsubCategoryById=handelError(async(req,res)=>{
    let subcategory=await subCatogeryModel.findById(req.params.id)
    res.json({message:"success",subcategory})
}) 
const updateSubCategory=handelError(async(req,res)=>{
    req.body.slug=slugify(req.body.title)
    req.body.image=req.file.filename
    let updateSubCategory=await subCatogeryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateSubCategory&&res.json({message:"updated",updateSubCategory})
      
    !updateSubCategory&&res.json({message:"not found subcategory"})

  
})
const deletSubCategory=deleteOne(subCatogeryModel)
export{
    addSubCategory,
    getAllSubCategories,
    getsubCategoryById,
    updateSubCategory,
    deletSubCategory
}