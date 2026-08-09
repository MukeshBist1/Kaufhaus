import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
    
      <footer className='mt-6 flex flex-wrap gap-3 justify-around items-center text-sm shadow-[0_-2px_4px_rgba(0,0,0,0.1)]'>
        <div>
          <div className='flex justify-center'>
            <img className='w-20' src="/images/logo/brand_logo.png" alt="logo" />
          </div>
          <p>Premium Products  |   Fast Delivery</p>
        </div>
        <div className='flex gap-3 text-blue-600 cursor-pointer'>
          <Link to="/about">About Me</Link>
          <Link to="/policy">Privacy Policy</Link>
          <Link to='/disclaimer'>Disclaimer</Link>
        </div>
        <div>&copy; 2026 Kaufhaus All rights reserved.</div>
      </footer>
    </>
  )
}

export default Footer