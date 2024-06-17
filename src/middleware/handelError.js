import { AppError } from "../utilis/AppError.js"

export const handelError=(fn)=>{
 return (req,res,next)=>{
    fn(req,res).catch(err=>next(new AppError(err,401)))
 }
}
