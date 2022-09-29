import React, { useState } from "react";
import { IconArrowDown } from "../Icons";
import "./Select.scss";

interface IOption {
    id: string | number;
    name: string;
}

interface IProps {
    options: Array<IOption>;
    value: string | number;
    setValue: (value: string) => void;
    required?: boolean;
}

const Select: React.FC<IProps> = ({ value, options, setValue, required }) => {
    const [selectOpen, setSelectOpen] = useState(false)

    return (
        <div className={"selectContainer"}>
            <select value={value} onChange={(e) => setValue(e.target.value)} required={required} onFocus={() => setSelectOpen(true)} onBlur={() => setSelectOpen(false)}>
                {options.map((option) =>
                    <option value={option.id} key={option.id}>{option.name}</option>
                )}
            </select>
            <span className={selectOpen ? "active" : ""}>
                <IconArrowDown color="default"/>
            </span>
        </div>
    );
};

export default Select;