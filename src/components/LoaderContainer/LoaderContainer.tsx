import React, { useEffect } from 'react'
import { Loader } from '../UI'
import "./LoaderContainer.scss"

interface IProps {
    isErrror?: boolean
}

const LoaderContainer: React.FC<IProps> = ({ isErrror = false }) => {
    
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "visible";
        }
    }, []);

    return (
        <section className={"section-loader-container"}>
            <div className="blur"></div>
            {isErrror
                ? <span>Произошла ошибка подключения к серверу. Повторите позже.</span>
                : <Loader />
            }
        </section>
    )
}

export default LoaderContainer