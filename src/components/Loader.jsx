import React from 'react';
import img from '../assets/loader.gif';

const Index = () => (
    <div id="loading">
        <div id="loading-center">
            <img src={img} alt="loader" />
        </div>
    </div>
);

export default Index;