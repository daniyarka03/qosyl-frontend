import React from 'react';
import './css/ButtonComponent.css';
const ButtonComponent = ({value, className, onClick, type, name}) => {
    return (
        <button className={`button ${className}`} onClick={onClick} type={type} name={name}>{value}</button>
    );
};

export default ButtonComponent;