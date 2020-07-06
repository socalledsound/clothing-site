export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? 
                {...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (items, itemToRemove) => {
    const existingCartItem = items.find(item => item.id === itemToRemove.id);
    console.log(existingCartItem);
    if(existingCartItem.quantity === 1){
        return items.filter(item => item.id !== itemToRemove.id)
    }
    return items.map(item => item.id === itemToRemove.id ? 
                            {...item, quantity: item.quantity - 1 } : item
                        )
}