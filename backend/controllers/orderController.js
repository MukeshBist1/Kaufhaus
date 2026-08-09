const orderModel=require('../models/orderModel')
const userModel=require('../models/userModel')

const sendEmail=require('../utils/sendEmail')

//create a new order
const createOrder=async(req,res)=>{
    try{
        const {items,totalAmount,address,paymentId}=req.body;
        if(!items || items.length===0 || !totalAmount || !address){
            return res.status(400).json({message:'Invalid order data'})
        }else{
            const order=await orderModel.create({
                user:req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
            let message=`Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created with the following details\n\nOrder ID:${order._id}\nTotal Amount:${order.totalAmount}\nShipping Address:${order.address.fullName}, ${order.address.street}, ${order.address.city}, ${order.address.postalCode}, ${order.address.country}\n\nThank you for choosing Kaufhaus.`
            await sendEmail(req.user.email,"Order Created",message)
            res.status(201).json(order)
        }
    }catch(error){
        res.status(500).json({message:'Server Error'})
        console.log(error)
    }
}

//client Orders
const myOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({user:req.user._id}).populate('items.product')
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({message:'Server Error'})
        console.log(error)
    }
}

//get orders admin
const getOrdersAdmin=async(req,res)=>{
    try{
        const orders=await orderModel.find({}).populate('user','id name')
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({message:'Server Error'})
        console.log(error)
    }
}

//updateOrderStatus
const updateOrderStatus=async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id)
        if(order){
            order.status=req.body.status
            await order.save()
            res.status(200).json({message: 'Order status updated',order})
        }else{
            res.status(404).json({message:'Order not found'})
        }
    }catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

module.exports={createOrder,myOrders,getOrdersAdmin,updateOrderStatus}