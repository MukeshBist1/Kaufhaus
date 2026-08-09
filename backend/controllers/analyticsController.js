const Order=require('../models/orderModel')
const User=require('../models/userModel')
const Product=require('../models/productModel')

const getAdminStats=async(req,res)=>{
    try{
        const totalUsers=await User.countDocuments()
    const totalOrders=await Order.countDocuments()
    const totalProducts=await Product.countDocuments()
    const orders=await Order.find({});
    const totalRevenueData=orders.reduce((acc,order)=>acc+order.totalAmount,0)
    res.json({
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue:totalRevenueData
    })
    }    
    catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

module.exports={getAdminStats}