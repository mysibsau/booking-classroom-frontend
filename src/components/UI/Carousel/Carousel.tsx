import React, { useEffect, useState } from 'react'
import "./Carousel.scss";
import { useSwipeable } from "react-swipeable";


interface ICarouselProps {
    children: React.ReactElement[] | React.ReactElement;
    indicators?: boolean;
    playOnHover?: boolean;
    timeInterval?: number;
}

interface ICarouselItemProps {
    children: React.ReactNode;
    width?: string;
}

export const CarouselItem: React.FC<ICarouselItemProps> = ({ children, width }) => {
    return (
        <div className={"carousel-item"} style={{ width: width }}>
            {children}
        </div>
    )
}

const Carousel: React.FC<ICarouselProps> = ({ children, indicators, playOnHover, timeInterval = 5000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(true);

    const updateIndex = (newIndex: number) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0
        }

        setActiveIndex(newIndex)
    }

    const handler = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    })

    useEffect(() => {
        const interval = setInterval(() => {
            if (playOnHover) {
                if (!paused) {
                    updateIndex(activeIndex + 1)
                }
            } else {
                updateIndex(activeIndex + 1)
            }
        }, timeInterval)

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    })

    return (
        <div
            {...handler}
            className={"carousel-container"}
            onMouseEnter={() => setPaused(false)}
            onMouseLeave={() => setPaused(true)}
        >
            <div className={"inner"} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { width: "100%" })
                })}
            </div>
            {indicators
                ?
                <div className={"indicators"}>
                    <div className={"indicators-container"}>
                        {React.Children.map(children, (_, index) => {
                            return <span className={`${activeIndex === index ? "active" : ""}`} onClick={() => setActiveIndex(index)} key={index}></span>
                        })}
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}

export default Carousel