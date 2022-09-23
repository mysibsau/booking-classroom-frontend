import React from 'react'
import "./Header.scss";

const Header = () => {
    const image = require("../../../assets/RulesImage.png")
    const background = require("../../../assets/background.png")

    return (
        <section className={"header-container"} style={{ backgroundImage: `url(${background})` }}>
            <div className={"header-info"}>
                <div>
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