import React, { useState } from 'react'
import "./ClassroomItem.scss";
import { Button, Carousel, CarouselItem, Modal } from '../../../../components/UI';
import { IClassroom } from '../../../../types/classroom'
import ItemModal from './ItemModal';


interface IProps {
    classroom: IClassroom;
}

const ClassroomItem: React.FC<IProps> = ({ classroom }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={"classroomItem-container"}>
            <div className={"photo-container"}>
                <Carousel indicators playOnHover timeInterval={2000}>
                    {classroom.room_photo.map((path, index) =>
                        <CarouselItem key={index}>
                            <img src={path.photo} alt={"classroom photo"} className={"classroom-image"} />
                        </CarouselItem>
                    )}
                </Carousel>
            </div>
            <div className={"info-container"}>
                <div className={"addres"}>{classroom.address}</div>
                <div className={"capacity"}>Кабинет на {classroom.capacity} человек</div>
                <div className={"description"}>{classroom.description}</div>
            </div>
            <div className={"button"}>
                <Button variant={"primary"} onClick={() => setShowModal(true)}>Подробнее</Button>
            </div>
            <Modal isShow={showModal} setIsShow={setShowModal} title={`Аудитория: ${classroom.address}`} >
                <ItemModal classroom={classroom} />
            </Modal>
        </div>
    )
}

export default ClassroomItem