//authcontroller.js

const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const sendEmail=require('../utils/sendEmail')

const generateToken=(id)=>{
    return jwt.sign({id},process.env.Jwt_Secret,{expiresIn:'1d'})
}

const registerUser=async (req,res)=>{
    const {name,email,password}=req.body
    try{
        const userExists=await User.findOne({email})
    if(userExists){
        return res.status(400).json({ message: "User already exists" })
    }
    const salt=bcrypt.genSaltSync(10)
    const hash=await bcrypt.hash(password,salt)
    const user=await User.create({
        name,
        email,
        password:hash
    })
    if(user){
        const otp =Math.floor(100000 + Math.random()*900000).toString();
        const message=`Welcome to Kaufhaus ${name}. 
        Your OTP for the Kaufhaus registration is: ${otp}
        Thank you for choosing Kaufhaus.`
        await sendEmail(email,"OTP for kaufhaus",message)
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
    }
}catch(error){
    res.status(500).json({message:'Server Error'})
}
}

//login user

const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
    }else{
        res.status(401).json({message:"Invalid email or password"})
    }
}catch(error){
    res.status(500).json({message:'Server Error'})
}
}

//get users

const getUsers=async(req,res)=>{
    try{
        const users=await User.find().select('-password')
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

module.exports={registerUser,loginUser,getUsers}