import React from 'react';
import './css/InputComponent.css';
const InputComponent = ({
                            typeInput,
                            classNameInput,
                            classNameLabel,
                            valueInput,
                            valueLabel,
                            onChangeFunc}) => {

    const style = {
        width: "100%",
        padding: "15px 10px",
        background: "rgba(48, 53, 226, 0.13)",
        border: "2px solid #3035E2",
        borderRadius: "7px",
        color: "#3035E2",
        fontWeight: "700",
        fontSize: "14px"
    }

    const styleLabel = {
        display: "block",
        marginBottom: "2px"
    }

    return (
        <div>
            <label className={classNameLabel} style={styleLabel}>{valueLabel}</label>
            <input
                type={typeInput}
                className={classNameInput}
                value={valueInput}
                style={style}
                onChange={onChangeFunc}
            />
        </div>
    );
};

export default InputComponent;