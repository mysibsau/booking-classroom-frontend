import React from 'react'
import { Link } from 'react-router-dom'
import { IconATelegramm, IconAVk, IconTelegramm, IconVk } from '../UI/Icons'
import "./Footer.scss"

const Footer = () => {
    const ok = require("../../assets/ok.png")
    const rutube = require("../../assets/rutube.jpg")

    const imgSize = window.matchMedia('(max-width: 800px)').matches ? 30 : 50;

    return (
        <section className={"footer-container"}>
            <div className={"contacts-info"}>
                <h3>Контакты</h3>
                <div>
                    <ul>
                        <li>660037, Сибирский федеральный округ, Красноярский край, г. Красноярск, проспект им. газеты Красноярский рабочий, 31, проспект Мира, 82</li>
                        <li>
                            <a href="https://www.sibsau.ru/page/contacts">Больше контактов</a>
                        </li>
                        <li>
                            <a href="https://www.sibsau.ru/map/">Карта корпусов</a>
                        </li>
                    </ul>
                    <ul>
                        <li>Приемная ректора: <a href="phone:+73912640014">+7 (391) 264-00-14</a></li>
                        <li>Приемная комиссия:<a href="phone:+73912629596">+7 (391) 262-95-96</a></li>
                        <li>Факс: <a href="phone:+79312644709">+7 (391) 264-47-09</a></li>
                        <li>E-mail: <a href="email:info@sibsau.tu">info@sibsau.ru</a></li>
                    </ul>
                </div>
            </div>
            <div className={"messangers"}>
                <h3>Социальные сети</h3>
                <div className={"messangers-container"}>
                    <Link to={"https://vk.com/sibgu_ru"} target="_blank"><IconVk size={imgSize}/></Link>
                    <Link to={"https://t.me/reshetnevuniversity"} target="_blank"><IconTelegramm size={imgSize} /></Link>
                    <Link to={"https://ok.ru/reshetnevuniversity"} target="_blank"><img src={ok} width={imgSize} /></Link>
                    <Link to={"https://rutube.ru/channel/25502476/"} target="_blank"><img src={rutube} width={imgSize} /></Link>
                    <Link to={"https://t.me/reshu_ru"} target="_blank"><IconATelegramm  size={imgSize}/></Link>
                    <Link to={"https://vk.com/reshu_ru"} target="_blank"><IconAVk size={imgSize} /></Link>
                </div>
            </div>
        </section>
    )
}

export default Footer