import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>No items in the cart yet.</p>
            ) : (
                <ul className="cart-items">
                    {cart.map((item, index) => (
                        <li key={index} className="cart-item">
                            {item.name} ({item.quantity})
                            <button onClick={() => removeFromCart(item)} className="remove-from-cart-button">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;