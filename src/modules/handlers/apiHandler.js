export const deleteOne=(model)=>{
return (async(req,res)=>{
   
    let deltedItem=await model.findByIdAndDelete(req.params.id)
    deltedItem&&res.json({message:"delted",deltedItem})
      
    !deltedItem&&res.json({message:"not found "})

  
})
}