import React, { useEffect, useState } from 'react'
import "./InputTime.scss";


interface IProps {
    times: string[];
    value: string;
    onChange?: (value: string) => void;
}

const InputTime: React.FC<IProps> = ({ value, onChange, times }) => {
    const [time, setTime] = useState<string>()
    const [showDatalist, setShowDatalist] = useState(false)

    useEffect(() => {
        setTime(value)
    }, [value])

    const clickTimeInput = (val: string) => {
        setTime(val)

        if (onChange) {
            onChange(val)
        }
    }

    return (
        <div onClick={() => setShowDatalist(!showDatalist)} className={"input-time-container"}>
            <div className={"label"}>{time}</div>
            {showDatalist && times.length ?
                <div className={"time-datalist"} >
                    {times.map((item, index) =>
                        <div className={"time-datalist-item"} key={index} onClick={() => clickTimeInput(item)}>{item}</div>
                    )}
                </div>
                :<></>
            }
        </div>
    )
}

export default InputTime