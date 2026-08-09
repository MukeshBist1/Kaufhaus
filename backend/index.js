//index.js
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require("express")
const dotenv=require("dotenv")
dotenv.config()
const app = express();
const cors = require("cors");
app.use(cors(
    {
        origin:"http://localhost:5173"
    }
))
const connectDB=require('./config/db')
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))



const authRoutes=require("./routes/authroutes")
app.use("/api/auth",authRoutes)
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));



app.get('/',(req,res)=>{
    res.send("Backend working !")
})

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is running at port:${port}`)
})