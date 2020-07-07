import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { publicKey } from '../../stripe/stripe.utils';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = publicKey;

    const onToken = token => {
        console.log(token);
        alert('successful payment process')
    }

    return (
        <StripeCheckout 
            label='pay now'
            name='whatever people'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`your total is: $${price}`}
            amount={priceForStripe}
            panelLabel='pay now'
            token={onToken}
            stripeKey={publishableKey}
        
        />
    )


}

export default StripeCheckoutButton