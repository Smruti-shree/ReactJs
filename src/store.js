import { configureStore, createSlice } from "@reduxjs/toolkit";
import VegItems from "./VegItems";
import NonvegItems from "./NonvegItems";

    const productSlice = createSlice({
        name : 'products',
        initialState :{
            VegItems : [
                {name:'Tomato',price:200.5,brand:'Green Giant '},
                {name:'cabbage',price:100.9,brand:'Pilgrim’s Pride '},
                {name:'potato',price:90.50,brand:'Green Giant '},
                {name:'Bringle',price:120.8,brand:'Pilgrim’s Pride'},
                {name:'ladis-finger',price:150.00,brand:'Green Giant '}
            ],
            NonvegItems:[
                {name:'fish',price:1000.0,brand:'Roma'},
                {name:'Chiken',price:400.50,brand:'Tyson'},
                {name:'mutton',price:1500.80,brand:'Tyson'},
                {name:'prawn',price:2000.00,brand:'Roma'},
                {name:'crab',price:500.05,brand:'Tyson'}
            ],
        },

    } );
    const cartsSlice = createSlice(
        {
            name : 'cart',
            initialState :[],
            reducers:{
                addToCart :(state,action)=>{
                    const status =state.find(item =>item.name === action.payload.name);
                    if(status){
                        status.quantity +=1;
                    }
                    else{
                        state.push({...action.payload,quantity:1});
                    }
                },

                increment: (state, action) => {
                    const item = state.find(item => item.name === action.payload.name);
                    if (item)
                        item.quantity += 1;
                },

                decrement: (state, action) => {
                    const item = state.find(item => item.name === action.payload.name);
                    if (item && item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        return state.filter(item => item.name !== action.payload.name);
                    }
                },
                removeCart: (state,action)=>{
                    return state.filter(item => item.name !== action.payload.name);
            },
        }
        });

    const store = configureStore(
        {
            reducer:
            {
                products:productSlice.reducer,
                cart:cartsSlice.reducer,
            }
        }
    );
export const{addToCart,increment,decrement,removeCart,applyDiscount} = cartsSlice.actions;
export default store;