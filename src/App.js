import React from 'react';
import './App.css';
import Header from './components/Header';
import Calculator from './components/Calculator';

const App = () => {
    return (
        <div data-cmp='app-cmp'>
            <Header/>
            <Calculator/>
        </div>
    );
};

export default App;
