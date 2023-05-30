import React from "react";
import { TYPES } from "../actions/actions";
import CartItem from "./CartItem";
import { useContext, useSelector, useState} from "react";
import CartContext from "../context/CartContext";
import { shoppingReducer, shoppingInitialState } from "../reducer/reducer";
import { Dispatch } from "react";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function DropdownCart() {
    {/*DECLARANDO PROPIEDADES QUE UTILIZARÉ DE MI CONTEXTO */}
    const {updateState, cart, dispatch} = useContext(CartContext);

    {/* FUNCIONES PARA ELIMINAR Y LIMPIAR EL CARRITO */}
    const deleteFromCart = (id, all = false) => {
        console.log(id, all)
        
        if (all) {
            dispatch({ type: TYPES.REMOVE_ALL_PRODUCTS, payload: id })
        } else {
            dispatch({ type: TYPES.REMOVE_ONE_PRODUCT, payload: id })
        }
    };

    {/*FUNCION PARA CALCULAR EL PRECIO TOTAL */}
    const calculateTotalPrice = () => {
        return(
            
            cart.reduce((total, product) => total + (product.price * product.quantity), 0)
            
        )
    };
    
    {/*CONSTANTES PARA EL MENU DE MATERIAL UI */}
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div>
                <h1>Cart</h1>
                <button>
                    {/*INDICADOR DE CANTIDADES DEL CARRITO, MATERIAL UI */}
                    <Badge
                        badgeContent={cart.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>                
                    </Badge>
                </button>
                <h2>TOTAL: {calculateTotalPrice()} $ </h2>
            </div>

            
            {/*MENU DE MATERIAL UI */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button',}}
            >
                {
                cart.length ? 
                <div>
                    <div>
                        <button onClick={updateState}>Limpiar Carrito</button>
                        <div className="box">
                            {cart.map((item, index) => <CartItem key={index}
                                data={item} deleteFromCart={deleteFromCart} />)}
                        </div>
                        </div>
                </div>:
                <div>
                    <p>El carrito está vacío</p>
                </div>
                }
            </Menu>

        </>

        
    )
}

export default DropdownCart;