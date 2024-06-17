import { handelError } from "../../../middleware/handelError.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import userModel from "../../../../db/models/user.model.js"
import ApiFeature from "../../../utilis/ApiFeature.js"
import { AppError } from "../../../utilis/AppError.js"

const createUser=handelError(async(req,res)=>{
 let user=await userModel.findOne({email:req.body.email})
 if(user)return next(new AppError("duplicate email",409))
 let preUser= new userModel(req.body)
 let createUser=await preUser.save()
 res.json({message:"sucsses",createUser})
})
const getAllUser=handelError(async(req,res)=>{
    let apiFeature=new ApiFeature(userModel.find(),req.query).pagination().sort().search().fields()
    let result=await apiFeature.mongooseQuery
    res.json({message:"success",page:apiFeature.page,result})
})
const getUserById=handelError(async(req,res)=>{
    let user=await userModel.findById(req.params.id)
    res.json({message:"success",user})
}) 
const updateUser=handelError(async(req,res)=>{
  
    let updateUser=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateUser&&res.json({message:"updated",updateUser})
      
    !updateUser&&res.json({message:"not found user"})

  
})
const deletUser=deleteOne(userModel)
const changePassword=handelError(async(req,res)=>{
     let {id}=req.params
    let changePass=await userModel.findByIdAndUpdate({_id:id},req.body,{new:true})
    changePass&&res.json({message:"updated",changePass})
      
    !changePass&&res.json({message:"not found user"})

  
})
export{
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deletUser,
    changePassword
}