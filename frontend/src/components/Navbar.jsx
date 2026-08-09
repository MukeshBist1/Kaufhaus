import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { clearCart } from '../redux/cartSlice'

function Navbar() {
const {user,logout}=useContext(AuthContext)
const cartItems=useSelector((state)=>state.cart.cartItems)
const cartCount = user ? cartItems.length : 0
const dispatch = useDispatch()
const navigate=useNavigate()

const handleLogout = () => {
  logout();
  dispatch(clearCart())
  navigate('/login');
};
  return (
    <>
      <nav className='flex flex-col md:flex-row justify-between items-center shadow-sm rounded-2xl px-[min(5vw,50px)]'>
        <div className='flex navbar_brandlogo_div'>
          <Link to='/'><img className='pr-1 w-30 md:w-35 lg:w-45' src="/images/logo/brand_logo.png" alt="logo" /></Link>
        </div>
        <div className='flex flex-col md:flex-row gap-[min(20px,2vw)] text-gray-500'>
          <div className='flex items-center gap-[min(20px,2vw)] border bg-amber-400 text-amber-50 border-amber-300 px-2 rounded-sm '>
            {user ? (
            <>
              <Link className='whitespace-nowrap' to="/profile">Hi, {user.name}</Link>
              {user.role === 'admin' && <Link className='font-bold' to="/admin">Admin</Link>}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          </div>
          <div className='flex justify-center  gap-[min(20px,2vw)] border-2 border-green-400 border-l-0 border-r-0 text-white  px-1 rounded-sm'>
            <Link className='bg-green-600 px-1 rounded-md my-0.5' to='/shop'>Shop</Link>
            <Link className='text-green-900' to={user ? '/cart' : '/login'}>
              Cart({cartCount})
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar