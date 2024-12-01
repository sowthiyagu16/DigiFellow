import React, { useState } from 'react';
import './Search.css';
import { useCart } from './CartContext';

function Search() {
    const [query, setQuery] = useState('');
    const [department, setDepartment] = useState('all');
    const [results, setResults] = useState([]);
    const { addToCart } = useCart();

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/search?department=${department}&query=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="search-department"
                >
                    <option value="all">All Departments</option>
                    <option value="electronics">Electronics</option>
                    <option value="books">Books</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home</option>
                </select>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products"
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <ul className="search-results">
                {results.map((item, index) => (
                    <li key={index}>
                        {item.name}
                        <button onClick={() => addToCart(item)} className="add-to-cart-button">
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;