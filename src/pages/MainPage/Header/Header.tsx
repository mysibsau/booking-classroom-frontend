import React from 'react'
import "./Header.scss";
import useCookie from '../../../hooks/useCookie';

const Header = () => {
    const image = require("../../../assets/Calendar.png")
    const { getCookie } = useCookie()
    const cookieUser = getCookie("user")
    return (
        <section className={`header-container ${cookieUser ? "login" : ""}`}>
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