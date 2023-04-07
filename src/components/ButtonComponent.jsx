import React from 'react';
import './css/ButtonComponent.css';
const ButtonComponent = ({value, className}) => {
    return (
        <button className={`button ${className}`}>{value}</button>
    );
};

export default ButtonComponent;