import { createSlice } from "@reduxjs/toolkit";

const hasAuthUser = !!localStorage.getItem('userInfo');
const initialState = {
    cartItems: hasAuthUser && localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload
            const existItem=state.cartItems.find(x=>x.productId===item.productId)
            if(existItem){
                state.cartItems=state.cartItems.map(x=>x.productId===existItem.productId?item:x)
            }else{
                state.cartItems=[...state.cartItems,item]
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))  
        },
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter(x=>x.productId!==action.payload)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))  
        },
        clearCart:(state)=>{
            state.cartItems=[]
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))  
        }
    }
})

export const {addToCart,removeFromCart,clearCart}=cartSlice.actions
export default cartSlice.reducer