import cartModel from "../../../../db/models/cart.model.js";
import orderModel from "../../../../db/models/order.model.js";
import productModel from "../../../../db/models/product.model.js";
import { handelError } from "../../../middleware/handelError.js";
import Stripe from 'stripe';
import { AppError } from "../../../utilis/AppError.js";
const stripe = new Stripe("sk_test_51PRjJaF0MEt92cQETp8gqcVf6xkrZuvveraThFPJhgi9mvvPBwqK9nrlCDDh99fzoC4RcZj1UKprKaBscs9Zpveg00WqRTLsxW");



const createCacheOrder=handelError(async(req,res)=>{
let cart=await cartModel.findById(req.params.id) 
let totalPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
let order=new orderModel({
    user:req.user._id,
    cartItems:cart.cartItems,
    totalPrice,
    shippingAddress:req.body.shippingAddress
})
if(order){
let options=cart.cartItems.map((item)=>({
    updateOne:{
         filter:{_id:item.product},
         update:{$inc:{quantity:-item.quantity,sold:item.quantity}}
    }
}))
await productModel.bulkWrite(options)
await order.save()

}else{
    return (next(new AppError("error occure",409)))
}
await cartModel.findByIdAndDelete(req.params.id)
res.json({message:"done",order})
})


    

const getOrder=handelError(async(req,res)=>{
    let result=await cartModel.findOne({user:req.user._id})
    
    res.json({message:"success",result})
})
const createOnineOrder=handelError(async(req,res)=>{
    let cart =await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError("cart not found",404))
    console.log(cart);
    let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
    let session=await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
              currency:'Egp',
              unit_amount:totalOrderPrice*100,
              product_data:{
                   name:req.user.name
              }  
            },
            quantity:1
        }],
        mode:"payment",
        success_url:"http://localhost:4200/en",
        cancel_url:"http://localhost:4200/en/404",
        client_reference_id:req.params.id,
        customer_email:req.user.email,
        metadata:req.body.shippingAddress
    })
    res.json({message:"done",session})
})


export{
    createCacheOrder,
    getOrder,
    createOnineOrder
    
}