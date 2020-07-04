import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import './cart-dropdown.styles.scss';
import { createStructuredSelector } from 'reselect';

const CartDropDown = ({ cartItems }) => (

    <div className="cart-dropdown">
        <div className="cart-items">
        {
            cartItems.length ? (
            cartItems.map(cartItem=>(
                <CartItem key={cartItem.id} item={cartItem} />
            ))
            )
            : (
                <span className="empty-message">your cart is empty</span>
            )}
        </div>
        <CustomButton>go to checkout</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default connect(mapStateToProps)(CartDropDown)