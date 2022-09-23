import React, { ChangeEvent } from "react";
import "./Textarea.scss";

interface IProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
    placeholder?: string;
    required?: boolean;
}

const Textarea: React.FC<IProps> = ({ placeholder, value, onChange, maxLength, required }) => {
    return (
        <div className={"myTextarea"}>
            <textarea
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
                rows={10}
                placeholder={placeholder}
                maxLength={maxLength}
                required={required} 
            />
            {maxLength
                ? <span className={"textareaLength"}>
                    {value.length}/{maxLength}
                </span>
                : <></>
            }
        </div>
    );
};

export default Textarea;