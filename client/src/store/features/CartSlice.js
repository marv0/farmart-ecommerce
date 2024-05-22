import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems:[],
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        increment: (state, action) => {
            const item = state.cartItems.find( //Checking if the animal already exists in the cart
                (el)=> el.animal.id === action.payload.id
            )
            if(item){
                item.quantity++
            }else{
                state.cartItems.push({
                    animal:action.payload,
                    quantity:1,
                })
            }
        },
        decrement: (state, action) => {
            const item = state.cartItems.find( //Checking if the product already exists in the cart
                (el)=> el.animal.id === action.payload.id
            )
            if(item){
                item.quantity--;
                if(item.quantity===0){
                    state.cartItems = state.cartItems.filter(
                        (el)=> el.animal.id !== action.payload.id
                    );
                };
            };
        },
        removeItem: (state, action) => {
            const item = state.cartItems.find( //Checking if the product already exists in the cart
                (el)=> el.animal.id === action.payload.id
            )
            if(item){
                state.cartItems = state.cartItems.filter(
                    (el)=> el.animal.id !== action.payload.id
                );
            }
        },
        clearCart: (state, action) => { //Clearing cart
            state.cartItems = [];
        }
    }
})

const cartItems = (state) => state.cart.cartItems;

export const totalCartItemsSelector = createSelector([cartItems], (cartItems)=>
    cartItems.reduce((total, curr)=>(total+=curr.quantity), 0)
);

export const totalPriceSelector = createSelector([cartItems], (cartItems)=>
    cartItems.reduce((total,curr)=>(total+= curr.quantity * curr.animal.price), 0)
)

export const productQtyInCartSelector = createSelector([cartItems, (cartItems,animalId)=>animalId],
    (cartItems,animalId)=>cartItems.find((el)=>el.animal.id===animalId)?.quantity
)

export const {increment, decrement, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;