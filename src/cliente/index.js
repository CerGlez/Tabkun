import React from 'react';
import { render } from 'react-dom';
import './styles/index.css';
import request from 'superagent';
//Components
import Header from './components/header';

const App = () => {
    return(
        <Header />
    ) 
};

render(
    <App />,
    document.getElementById('app')
);
