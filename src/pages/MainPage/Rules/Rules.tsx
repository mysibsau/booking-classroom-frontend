import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem } from '../../../components/UI';
import { useClassroomStore } from '../../../stores';
import "./Rules.scss";

const Rules = () => {
    const { getStaticData, staticData } = useClassroomStore(state => state)
    const background = require("../../../assets/background.png")

    const [rules, setRules] = useState<string[]>([])

    useEffect(() => {
        getStaticData()
    }, [])

    useEffect(() => {
        if (staticData) {
            setRules(staticData.spec_text.split("\n"))
        }
    }, [staticData])

    return (
        <section className={"rules-container"} style={{ backgroundImage: `url(${background})` }}>
            <div className="blur" />
            <div className={"rules-image-container"}>
                {staticData &&
                    <Carousel indicators timeInterval={1000000}>
                        {staticData.carousel_photo.map((item, index) =>
                            <CarouselItem key={index}>
                                <div className={"carouselItem-container"}>
                                    <div className={"image-container"} style={{ backgroundImage: `url(${item.photo})` }} />
                                    <div className={"name"}>
                                        {item.event}
                                    </div>
                                    <div className={"place"}>
                                        {item.address}
                                    </div>
                                </div>
                            </CarouselItem>
                        )}
                    </Carousel>
                }
            </div>
            <div className={"rules-info"}>
                <div className={"required"}>Обязательно ознакомиться</div>
                <h2>{rules[0]}</h2>
                <ul>
                    {rules.map((item, index) =>
                        index !== 0
                        && <li>{item}</li>
                    )}
                </ul>
            </div>
        </section>
    )
}

export default Rules