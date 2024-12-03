import React from 'react';
import { useCart } from './CartContext';
import './Checkout.css';

function Checkout() {
    const { cart } = useCart();
    const itemPrice = 2; // Fixed price for each item
    const totalPrice = cart.reduce((total, item) => total + item.quantity * itemPrice, 0);

    return (
        <div className="checkout-container">
            <div className="row">
                <div className="col-md-8">
                    <h2>Checkout</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" className="form-control" id="state" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zip" className="form-label">Zip Code</label>
                            <input type="text" className="form-control" id="zip" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Place Order</button>
                    </form>
                </div>
                <div className="col-md-4">
                    <h2>Order Summary</h2>
                    <ul className="list-group mb-3">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                <span>{item.name} (x{item.quantity})</span>
                                <strong>${item.quantity * itemPrice}.00</strong>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total</span>
                            <strong>${totalPrice}.00</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Checkout;