import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

function MainPage() {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/cart">Cart</Link>
                </nav>
            </header>
            <Search />
        </div>
    );
}

export default MainPage;