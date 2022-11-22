import React from 'react'
import "./Header.scss";

const Header = () => {
    const image = require("../../../assets/Calendar.png")

    return (
        <section className={"header-container"}>
            <div className={"header-info"}>
                <div className={"calendar-container"}>
                    <img src={image} alt="" />
                </div>
                <p>
                    Удобное бронирование аудиторий для ваших мероприятий
                </p>
            </div>
        </section>
    )
}

export default Header