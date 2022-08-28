import React from "react";
import "./Button.scss";


const variants = new Map([
    ["default", "default"],
    ["primary", "primary"],
    ["disabled", "disabled"],
    ["danger", "danger"],
    ["secondary", "secondary"],
    ["success", "success"]
]);

type VariantType = "default" | "primary" | "disabled" | "danger" | "secondary" | "success"

interface IProps {
    children: React.ReactNode;
    variant?: VariantType;
    onClick?: () => void;
    id?: string;
}

const Button:React.FC<IProps> = ({id, variant = "default", onClick, children}) => {
    return (
        <button onClick={onClick} id={id} className={`myButton ${variants.get(variant)}`} disabled={variant === "disabled"}>
            {children}
        </button>
    );
};

export default Button;