import React from 'react'
import "./Tooltip.scss";


type TPosition = "top" | "bottom" | "left" | "right"

interface IProps {
    children: React.ReactNode;
    text: string;
    position?: TPosition
}

const Tooltip: React.FC<IProps> = ({ children, text, position = "top" }) => {
    return (
        <div className={`tooltip-container ${position}`}>
            {children}
            <span className={"tooltip-text"}>{text}</span>
        </div>
    )
}

export default Tooltip