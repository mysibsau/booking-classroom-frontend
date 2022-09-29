import React, { useEffect } from 'react'
import { Loader } from '../UI'
import "./LoaderContainer.scss"

const LoaderContainer = () => {
    const background = require("../../assets/background.png")

    useEffect(() => {
        
    })

    return (
        <section className={"section-loader-container"} style={{ backgroundImage: `url(${background})` }}>
            <div className="blur"></div>
            <Loader />
        </section>
    )
}

export default LoaderContainer