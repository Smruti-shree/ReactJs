import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";


function VegItems()
{
    const vegProducts = useSelector(state => state.products.VegItems)
    const dispatch = useDispatch()

    const Items = vegProducts.map((product,index) =>
                    <li key={index}>
                            {product.name} -${product.price.toFixed(2)}
                        <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
                </li>
    )

    return(
        <>
        <h1>This is veg Page</h1>
        <h2>Veg Products</h2>
        <ul>
            {Items}
        </ul>
        </>
    );
}
export default VegItems;