import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";

function NonvegItems()
{

    const NonvegProducts = useSelector(state => state.products.NonvegItems)
    const dispatch = useDispatch();

    const Items = NonvegProducts.map((product,index) =>
                    <li key={index}>
                            {product.name} -${product.price.toFixed(2)}
                        <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
                </li>
                    )
    return(
        <>
        <h1>This is Non-veg Page</h1>
        <h2>Non-veg items</h2>
        <ul>
            {Items}
        </ul>
        </>
    )
}
export default NonvegItems;