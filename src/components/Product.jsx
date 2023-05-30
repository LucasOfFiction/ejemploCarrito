import React from 'react';
import styles from '../styles/products.css';

const Product = ({data, addToCart}) => {

    const {id, name, price} = data;

    return (
        <div className="product">
            <h4>{name}</h4>
            <h5>${price}</h5>
            <button className='product_btn'  onClick={() => addToCart(id)}>Agregar</button>
        </div>
    )
}

export default Product

