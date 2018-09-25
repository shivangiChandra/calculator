import React from 'react';
import logo from './../logo.svg';


const Header = () => {
    return (
        <header data-cmp='header-cmp'>
            <img data-cmp='header-logo' src={logo} alt="[=] Equal Experts"/>
        </header>
    );
};

export default Header;


