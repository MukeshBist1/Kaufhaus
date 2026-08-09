const Product=require('../models/productModel')
const cloudinary=require('../config/cloudinary')

const getProducts=async(req,res)=>{
    try{
        const products=await Product.find({}).sort({createdAt:-1})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    }
    else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct=async(req,res)=>{
    try{
        const {name,description,price,category,stock}=req.body
        let imageUrl=""
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path)
            imageUrl=result.secure_url
        }
        const product=await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        })
        res.status(201).json(product)
    }catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

const updateProduct=async(req,res)=>{
    try{
        const {name,description,price,category,stock}=req.body
        const product=await Product.findByIdAndUpdate(req.params.id)
        if(product){
          product.name=name||product.name
          product.description=description||product.description
          product.price=price||product.price
          product.category=category||product.category
          product.stock=stock||product.stock
          if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path)
            product.imageUrl=result.secure_url
          }
          const updateProduct=await product.save()
          res.status(200).json(updateProduct)
        }else{
          res.status(404).json({message:'Product not found'})
        }
    }catch(error){
        res.status(500).json({message:'Server Error'})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports={getProducts,createProduct,updateProduct,deleteProduct,getProductById}