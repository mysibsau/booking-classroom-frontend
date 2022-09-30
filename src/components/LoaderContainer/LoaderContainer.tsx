import React, { useEffect } from 'react'
import { Loader } from '../UI'
import "./LoaderContainer.scss"

interface IProps {
    isErrror?: boolean
}

const LoaderContainer: React.FC<IProps> = ({ isErrror = false }) => {
    const background = require("../../assets/background.png")

    useEffect(() => {

    })

    return (
        <section className={"section-loader-container"} style={{ backgroundImage: `url(${background})` }}>
            <div className="blur"></div>
            {isErrror
                ? <span>Произошла ошибка подключения к серверу. Повторите позже.</span>
                : <Loader />
            }
        </section>
    )
}

export default LoaderContainer