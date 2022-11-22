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
                        <li>По вопросам бронирования: <a href="phone:+79138302400">+7 (913) 830-24-00</a></li>
                        <li>По вопросам администрирования: <a href="phone:+73912227323">+7 (391) 222-73-23</a></li>
                        <li>Факс: <a href="phone:+79312644709">+7 (391) 264-47-09</a></li>
                        <li>E-mail: <a href="email:info@sibsau.tu">info@sibsau.ru</a></li>
                    </ul>
                </div>
            </div>
            <div className={"messangers"}>
                <h3>Социальные сети</h3>
                <div className={"messangers-container"}>
                    <a href={"https://vk.com/sibgu_ru"} target="_blank"><IconVk size={imgSize}/></a>
                    <a href={"https://t.me/reshetnevuniversity"} target="_blank"><IconTelegramm size={imgSize} /></a>
                    <a href={"https://ok.ru/reshetnevuniversity"} target="_blank"><img src={ok} width={imgSize} /></a>
                    <a href={"https://rutube.ru/channel/25502476/"} target="_blank"><img src={rutube} width={imgSize} /></a>
                    <a href={"https://t.me/reshu_ru"} target="_blank"><IconATelegramm  size={imgSize}/></a>
                    <a href={"https://vk.com/reshu_ru"} target="_blank"><IconAVk size={imgSize} /></a>
                </div>
            </div>
        </section>
    )
}

export default Footer