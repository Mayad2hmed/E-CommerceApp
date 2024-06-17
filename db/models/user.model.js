import mongoose from "mongoose";
import bcrypt from"bcrypt"
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
       
    },
    email:{
        type:String,
        required:true,
         unique:true
    },
   phone:String,
   changePasswordAt:Date,
    
    role:{
        type:String,
        enums:['admin','user'],
        default:'user'
    },
    password:{
        type:String,
        required:true}
,    
isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    wishlist:{
        type:mongoose.Schema.ObjectId,
        ref:"product"
    }

},{
    timestamps:true
})
userSchema.pre("save",function () {
    this.password=bcrypt.hashSync(this.password,7)
})
userSchema.pre("findOneAndUpdate",function () {
    this._update.password=bcrypt.hashSync(this._update.password,7)
})
const userModel=mongoose.model("User",userSchema)
export default userModel