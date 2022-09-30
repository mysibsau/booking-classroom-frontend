import React, { useState } from 'react'
import { Carousel, CarouselItem } from '../../../../../components/UI';
import { useAuthStore } from '../../../../../stores';
import { IClassroom } from '../../../../../types/classroom'
import "./ItemModal.scss";
import BookingForm from './BookingForm';
import AuthForm from '../../../../../components/AuthForm';

interface IProps {
    classroom: IClassroom;
}

const ItemModal: React.FC<IProps> = ({ classroom }) => {
    const { user } = useAuthStore(state => state)

    const [logInForm, setLogInForm] = useState(false)

    return (
        <>
            {!logInForm
                ? <div className={"itemModal-container"}>
                    <div className={"info-container"}>
                        <div className={"modal-photo-container"}>
                            <Carousel indicators>
                                {classroom.room_photo.map((path, index) =>
                                    <CarouselItem key={index}>
                                        <img src={path.photo} alt={"classroom photo"} className={"classroom-image"} />
                                    </CarouselItem>
                                )}
                            </Carousel>
                        </div>
                        <div className={"description-container"}>
                            <div>
                                <h3>Вместимость:</h3>
                                <span>Данная аудитория подходит для размещения до {classroom.capacity} человек.</span>
                            </div>
                            <div>
                                <h3>Оснащение:</h3>
                                <ul>
                                    {classroom.equipment.map((item, index) =>
                                        !item.is_spec_equip &&
                                        <li key={index}>
                                            <span>{item.cound} {item.equipment}, {item.description}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3>Оснащение, требующее присутствие специалиста:</h3>
                                <ul>
                                    {classroom.equipment.map((item, index) =>
                                        item.is_spec_equip &&
                                        <li key={index}>
                                            <span>{item.cound} {item.equipment}, {item.description}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3>Описание:</h3>
                                <span>{classroom.description}</span>
                            </div>
                            {user
                                ? <div>
                                    <h3>Контакты администратора:</h3>
                                    <span>{classroom.admin}, {classroom.admin_contact_info}</span>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                    <BookingForm setLogInForm={setLogInForm} classroom={classroom} />
                </div>
                : <AuthForm setLogInForm={setLogInForm} />
            }
        </>
    )
}

export default ItemModal