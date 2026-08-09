import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const fetchProducts=async ()=>{
      try{
        const res=await fetch('/api/products')
        const data=await res.json()
        setProducts(data.slice(0,4))
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    };
    fetchProducts()
  }, [])
  return (
    <>
      <div className='flex flex-col items-center column min-h-[50vh] px-3'>
        <h1 className='w-fit bg-linear-to-r  from-red-300 via-blue-950 to-blue-300 bg-clip-text text-transparent
         text-3xl md:text-4xl lg:text-6xl font-bold mt-12 mb-3'>Welcome to Kaufhaus</h1>
        <p className=' text-gray-500 my-2'>The best online store for all your shopping needs.</p>
      </div>
      <h2 className='text-3xl font-bold m-4 ml-10'>Featured Products</h2>
      {
        loading?<p>Loading...</p>:
        <div className='flex flex-wrap gap-10 p-10'>
          {products.map(product=>(
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      }
    </>
  )
}

export default Home