import React from 'react'
import "./Team.scss";

const Team = () => {
    const Oleg = require("../../../assets/Team/Oleg.jpeg");
    const Ivan = require("../../../assets/Team/Ivan.jpeg");
    const Anastasiya = require("../../../assets/Team/Anastasiya.jpeg");
    const Ilya = require("../../../assets/Team/Ilya.jpeg");

    return (
        <section className={"team-container"}>
            <h2>Команда разработчиков</h2>
            <div className={"team-list-container"}>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={Oleg} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Капитанов Олег</div>
                        <div>Frontend разработчик</div>
                    </div>
                </div>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={Ivan} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Жданов Иван</div>
                        <div>Backend разработчик</div>
                    </div>
                </div>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={Anastasiya} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Апанасова Анастасия</div>
                        <div>Дизайнер</div>
                    </div>
                </div>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={Ilya} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Скоробогатов Илья</div>
                        <div>Project manager</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team