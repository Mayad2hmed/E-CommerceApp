
import cartModel from "../../../../db/models/cart.model.js";
import couponModel from "../../../../db/models/coupon.model.js";
import productModel from "../../../../db/models/product.model.js";
import { handelError } from "../../../middleware/handelError.js";
import { AppError } from "../../../utilis/AppError.js";


function calcPrice(cart) {
    let totalPrice=0;
    cart.cartItems.forEach(element => {
        totalPrice=element.quantity*element.price
        
    });
    cart.totalPrice=totalPrice
}

const createCart=handelError(async(req,res,next)=>{
let product=await productModel.findById(req.body.product).select("price")   
!product && next(new AppError("product not found",404)) 
req.body.price=product.price
let isCartExist=await cartModel.findOne({user:req.user._id})
if(!isCartExist){
    let cart=new cartModel({
        user:req.user._id,
        cartItems:[req.body]
    })
    calcPrice(cart)
    await cart.save()
    return res.status(200).json({message:"created",cart})
}
let item=isCartExist.cartItems.find((ele)=>ele.product==req.body.product)
if(item){
    item.quantity+=1
}else{
    isCartExist.cartItems.push(req.body)
}
calcPrice(isCartExist)
if(isCartExist.discount)isCartExist.totalPriceAfterDiscount=isCartExist.totalPrice-(isCartExist.totalPrice*isCartExist.discount)/100
isCartExist.save()
res.json({message:"done",isCartExist})

})
const getCart=handelError(async(req,res)=>{
    let result=await cartModel.findOne({user:req.user._id})
    
    res.json({message:"success",result})
})
const removeCart=handelError(async(req,res)=>{
    let result=await cartModel.findByIdAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcPrice(result)
    res.json({message:"success",result})
})
const updateCart=handelError(async(req,res)=>{
    let product=await productModel.findById(req.body.product).select("price")   
    !product && next(new AppError("product not found",404)) 
    req.body.price=product.price
    let isCartExist=await cartModel.findOne({user:req.user._id})
   
    let item=isCartExist.cartItems.find((ele)=>ele.product==req.body.product)
    !item && res.json("invalid item",404)
    if(item){
        item.quantity=req.body.quantity
    }
    calcPrice(isCartExist)
    isCartExist.save()
    res.json({message:"done"})
    
    })

const applyCoupon=handelError(async(req,res,next)=>{
let code=await couponModel.findOne({code:req.params.code})
let cart=await cartModel.findOne({user:req.user._id})
cart.totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*code.discount)/100
await cart.save()
res.json({message:"done",cart})


})
export{
    createCart,
    getCart,
    removeCart,
    updateCart,
    applyCoupon
    
}