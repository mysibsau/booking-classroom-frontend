import React, { ChangeEvent } from "react";

import "./Input.scss";


interface IProps {
    type: string;
    value: string;
    onChange: (value: string) => void;
    inputIcon?: JSX.Element;
    placeholder?: string;
    id?: string;
}

const Input: React.FC<IProps> = ({inputIcon, placeholder, type, id, value, onChange}) => {
    return(
        <div className={`input-container ${inputIcon && "icon"}`}>
            <input
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                id={id}
            />
            {inputIcon && <span>{inputIcon}</span>}
        </div>
    );
};

export default Input;