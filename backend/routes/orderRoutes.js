const express=require('express')
const {protect,admin}=require('../middlewares/authMiddleware')
const {myOrders,getOrdersAdmin,createOrder,updateOrderStatus}=require('../controllers/orderController')

const router=express.Router()   

router.route('/').get(protect,admin,getOrdersAdmin).post(protect,createOrder)
router.route('/:id/status').put(protect,admin,updateOrderStatus)
router.route('/myOrders').get(protect,myOrders)

module.exports=router
