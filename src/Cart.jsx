import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeCart } from "./Store";
import { useState } from "react";

function Cart()
{
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const[discountPercentageAmount,setDiscountPercentageAmount] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);


    const cartsProduct =
        <ul>
            {cartItems.map((item, index) => (
                <li key={index}>
                    {item.name} - ${item.price.toFixed(2)}  -
                    <button onClick={() => dispatch(increment(item))}> + </button>
                    <button onClick={() => dispatch(decrement(item))}> - </button>
                : Quantity: {item.quantity}
                -<button onClick={()=> dispatch(removeCart(item))}>Remove</button>
                </li>
            ))}
        </ul>

    const handleDiscountPercentage = (discountValue) =>{
        setDiscountPercentageAmount(discountValue);
    };

    const handleApplyCoupon = () => {

        switch (couponCode) {
            case 'SAVE10':
                setCouponDiscountPercentage(10);
                break;
            case 'SAVE15':
                setCouponDiscountPercentage(15);
                break;
            case 'SAVE25':
                setCouponDiscountPercentage(25);
                break;
            default:
                alert('Invalid coupon code!');
                setCouponDiscountPercentage(0);
                return;
        }
        setCouponCode('');
    };

//main logics to calculate the total amount
const calculateTotal = ()=>{
    const total = cartItems.reduce((sum,item) => sum +item.price* item.quantity,0);

    //calculate the discount
    const discount = (total * discountPercentageAmount) / 100;
    //Coupon code discount
    const couponDiscount = (total * couponDiscountPercentage) / 100;
    const finalDiscount = discount + couponDiscount;

    //calculate netAmount
    const netAmount = total - finalDiscount;

    //return above three values
    return [total, finalDiscount, netAmount];
};

//calling the main logics calculateTotal() it return 3- values in the form of array,we are
//using array destructuring to store into 3-variables.

const [finalTotal, finalDiscountAmount, finalNetAmount] = calculateTotal();

    return(
        <>
        <h2>This is Shopping Cart</h2>
        {cartItems.length ===0 ? (
            <p>Your cart is empty.</p>
        ) :(
            <>
            {cartsProduct}
            <p>Total Before Discount : ${finalTotal.toFixed(2)}</p>
            <button onClick={()=>handleDiscountPercentage(10)}> Apply 10% Discount</button>
            <button onClick={()=>handleDiscountPercentage(20)}> Apply 20% Discount</button>
            <button onClick={()=>handleDiscountPercentage(30)}> Apply 30% Discount</button>
            <p>Discount Percentage Applied : ${discountPercentageAmount}%</p>
            <>
            <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                        />
                        <button onClick={handleApplyCoupon}>Apply Coupon</button>
            </>
                    <p>Coupon Discount Percentage: {couponDiscountPercentage}%</p>
                    <p>Discount amount : ${finalDiscountAmount.toFixed(2)}</p>
            <p>Final Amount After Discount :${finalNetAmount.toFixed(2)}</p>
            </>
        )}
        </>
    );
}
export default Cart;