import { AppError } from "../utilis/AppError.js"

export const validation=(schema)=>{
return(req,res,next)=>{
    let filter={}
    if(req.file){
        filter={image:req.file,...req.body,...req.params,...req.query}
    }else if(req.files){
        filter={...req.files,...req.body,...req.params,...req.query}

    
    }else{
        filter={...req.body,...req.params,...req.query}

    }
    
    
    let{error}=schema.validate(filter,{abortEarly:false})
    if(!error){
        next()
    }else{
        let errorList=[]
        error.details.forEach(element => {
            errorList.push(element.message)
        });
        next(new AppError (errorList,401))
    }
}
}