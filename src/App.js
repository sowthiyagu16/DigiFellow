import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import Cart from './Cart';
import Checkout from './Checkout';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="App bg-light">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/main">DigiFellow</Link>
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">New User</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="container mt-4">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route
                                    path="/main"
                                    element={
                                        <PrivateRoute>
                                            <MainPage />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/cart"
                                    element={
                                        <PrivateRoute>
                                            <Cart />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/checkout"
                                    element={
                                        <PrivateRoute>
                                            <Checkout />
                                        </PrivateRoute>
                                    }
                                />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;