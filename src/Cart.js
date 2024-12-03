import React from 'react';
import { Link } from 'react-router-dom';
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
                <>
                    <ul className="cart-items list-group mb-3">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                {item.name} (x{item.quantity})
                                <button onClick={() => removeFromCart(item)} className="btn btn-danger">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Link to="/checkout" className="btn btn-primary">
                        Proceed to Checkout
                    </Link>
                </>
            )}
        </div>
    );
}

export default Cart;