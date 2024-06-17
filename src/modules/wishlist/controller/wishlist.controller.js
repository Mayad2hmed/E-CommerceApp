
import userModel from "../../../../db/models/user.model.js"

const addToWishList=async(req,res,next)=>{

 let whishlist=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{whishlist:req.body.product}},{new:true}).populate('wishlist')

 !whishlist&&res.status(404).json({message:"whishlist not found"})
 whishlist&&res.json({message:"success",whishlist:whishlist.whishlist})

 res.json({message:"success",whishlist})

}
/*const removeFromWishlist=handelError(async(req,res,next)=>{
    let {product}=req.body
    let result=await userModel.findOneAndUpdate(req.user._id,{$pull:{wishlist:product}},{new:true})
   !result&&next(new AppError("not found wishlist",404))
   result&&res.json({message:"done",result})
   
   })
   const getAllWishlist=handelError(async(req,res,next)=>{
    
    let result=await userModel.findOne({_id:req.user._id})
   !result&&next(new AppError("not found wishlist",404))
   result&&res.json({message:"done",result:result.wishlist})
   
   })*/


export{
    addToWishList,
 
}