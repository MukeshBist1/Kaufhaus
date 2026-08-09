import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className='relative border border-gray-300 rounded-2xl h-80 w-70 p-5'>
        <img className=' rounded-lg' src={product.imageUrl} alt={product.name} />
        <div className='absolute bottom-0'>
          <p className='text-lg font-bold'>{product.name}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <Link className='text-orange-400' to={`/product/${product._id}`}>
             view details
          </Link>
        </div>
    </div>
  )
}

export default ProductCard