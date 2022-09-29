import React, { ChangeEvent, useState, FocusEvent } from "react";

import "./Input.scss";


type TInput = "text" | "number" | "date" | "time" | "password" | "datetime-local"

interface IProps {
    type: TInput;
    value: string;
    onChange?: (value: string) => void;
    inputIcon?: JSX.Element;
    placeholder?: string;
    id?: string;
    required?: boolean;
    readonly?: boolean
    onClick?: () => void;
    onFocus?: (val: boolean) => void;
}

const Input: React.FC<IProps> = ({ inputIcon, placeholder, type, id, value, onChange, onClick, onFocus, required, readonly }) => {
    const [showPassword, setShowPassword] = useState(type === "password")

    return (
        <div className={`input-container ${inputIcon && "icon"}`}>
            <input
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange ? onChange(e.target.value) : {}}
                placeholder={placeholder}
                type={type === "password" && showPassword ? "text" : type}
                id={id}
                required={required}
                readOnly={readonly}
                onClick={onClick}
                onFocus={() => onFocus ? onFocus(true) : {}}
                onBlur={() => onFocus ? onFocus(false) : {}}
            />
            {inputIcon
                ? <span onClick={() => {
                    if (type === "password") {
                        setShowPassword(!showPassword)
                    }
                }}>{inputIcon}</span>
                : <></>
            }
        </div>
    );
};

export default Input;