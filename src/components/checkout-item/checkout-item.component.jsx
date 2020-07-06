import React from 'react';
import { connect } from 'react-redux';
import './checkout-item.styles.scss';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({item, clearItem, increaseQuantity, decreaseQuantity}) => {
   const {name, imageUrl, quantity, price } = item;
   console.log(imageUrl);
    return (
        <div className="checkout-item">
            <div className='image-container'>
                <img src={imageUrl} alt="item"/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => decreaseQuantity(item)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => increaseQuantity(item)}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={()=>clearItem(item)}>
                &#10005;
            </div>
        </div>
    );

};


const mapDispatchToProps = (dispatch) => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    increaseQuantity: item => dispatch(addItem(item)), 
    decreaseQuantity: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)