//authroutes.js

const express=require('express')
const router=express.Router()
const {registerUser,loginUser,getUsers}=require("../controllers/authController")
const {protect,admin}=require("../middlewares/authMiddleware")

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/getusers',protect,admin,getUsers)

module.exports=router