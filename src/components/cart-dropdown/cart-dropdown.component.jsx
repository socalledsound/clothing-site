import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import './cart-dropdown.styles.scss';


const CartDropDown = ({ cartItems, history, dispatch }) => (

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
        <CustomButton onClick={()=> {
            dispatch(toggleCartHidden())
            history.push('/checkout');
        }
        }>go to checkout</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropDown))