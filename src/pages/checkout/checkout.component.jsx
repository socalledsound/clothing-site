import React from 'react';
import { connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
// import SignUp from '../../components/sign-up/sign-up.component'
import './checkout.styles.scss';

const CheckoutPage = ({cartItems, cartTotal}) => (
    <div className='checkout-page'>
        <div className="checkout-header">
            <div className="header-block">
               <span>product</span>
            </div>
            <div className="header-block">
               <span>description</span>
            </div>
            <div className="header-block">
               <span>quantity</span>
            </div>
            <div className="header-block">
               <span>price</span>
            </div>
            <div className="header-block">
               <span>remove</span>
            </div>            
        </div>
        {cartItems.map( item => (
                <CheckoutItem key={item.id} item={item} />
            ))}
        <div className='total'>Total: ${cartTotal}</div>
        <div className="test-warning">
            please use the following test credit card
            <br />
            4242 4242 4242 4242 exp 01/21 cvv 123
        </div>
        <StripeCheckoutButton price={cartTotal} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})


export default connect(mapStateToProps)(CheckoutPage)