import React from 'react';


const TextArea = ({className, onChange, value, name}) => {
    return (
        <textarea className={className} onChange={onChange} name={name}>{value}</textarea>
    );
};

export default TextArea;