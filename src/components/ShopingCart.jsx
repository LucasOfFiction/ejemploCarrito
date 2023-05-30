import { TYPES } from "../actions/actions";
import { useReducer, useEffect } from "react";
import { shoppingReducer, shoppingInitialState } from "../reducer/reducer";
import styles from '../styles/products.css?inline';
import axios from "axios";
import Product from "./Product";
import CartItem from "./CartItem";
import CartContext from "../context/CartContext";



const ShoppingCart = (props) => {


    
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

    const {products, cart} = state

    const updateState = async () => {
        const resProducts = await axios("http://localhost:3000/products");
        const resCart = await axios("http://localhost:3000/cart");
        const newProduct = await resProducts.data
        const newCartItem = await resCart.data
    
        dispatch({type: TYPES.READ_STATE, payload: [newProduct, newCartItem]})
    }
    
    useEffect(() => {
        updateState()
    }, [])
    
    const addToCart = (id) => {
        console.log(id)
        dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    };


    

    return (
        <>
        <CartContext.Provider value={{
            updateState,
            cart:state.cart,
            dispatch,
            state,
            
        }}>

            {props.children}
        </CartContext.Provider>
            <h1>Carrito de Compras</h1>
            <h3>Productos</h3>
            <div className="product_div">
                {products.map((product) => <Product key={product.id}
                    data={product} addToCart={addToCart} />)}
            </div>
        </>
    );

};

export default ShoppingCart;