import React from 'react'
import "./Team.scss";

const Team = () => {
    const image1 = require("../../../assets/me.jpg");
    const background = require("../../../assets/background.png")

    return (
        <section className={"team-container"} style={{ backgroundImage: `url(${background})` }}>
            <h2>Команда разработчиков</h2>
            <div className={"team-list-container"}>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={image1} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Капитанов Олег</div>
                        <div>Frontend разработчик</div>
                    </div>
                </div>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={image1} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Капитанов Олег</div>
                        <div>Backend разработчик</div>
                    </div>
                </div>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={image1} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Капитанов Олег</div>
                        <div>Дизайнер</div>
                    </div>
                </div>
                <div className="team-list-item">
                    <div className={"image-container"}>
                        <img src={image1} alt="" />
                    </div>
                    <div className={"info-container"}>
                        <div>Капитанов Олег</div>
                        <div>Project manager</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team