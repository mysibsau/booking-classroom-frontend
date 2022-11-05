import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem } from '../../../../../components/UI';
import { useAuthStore } from '../../../../../stores';
import { IClassroom } from '../../../../../types/classroom'
import "./ItemModal.scss";
import BookingForm from './BookingForm';
import AuthForm from '../../../../../components/AuthForm';

interface IProps {
    classroom: IClassroom;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ItemModal: React.FC<IProps> = ({ classroom, setTitle }) => {
    const { user } = useAuthStore(state => state)

    const [logInForm, setLogInForm] = useState(false)

    const specEquipnemt = classroom.equipment.filter(item => item.is_spec_equip)
    const equipment = classroom.equipment.filter(item => !item.is_spec_equip)

    useEffect(() => {
        if (logInForm) {
            setTitle("")
        } else {
            setTitle(`Аудитория: ${classroom.address}`)
        }
    }, [logInForm])

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
                            {equipment.length
                                ? <div>
                                    <h3>Оснащение:</h3>
                                    <ul>
                                        {equipment.map((item, index) =>
                                            <li key={index}>
                                                <span>{index + 1}. {item.cound} {item.equipment} {item.description}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                : null
                            }
                            {specEquipnemt.length
                                ? <div>
                                    <h3>Оснащение, требующее присутствие специалиста:</h3>
                                    <ul>
                                        {specEquipnemt.map((item, index) =>
                                            <li key={index}>
                                                <span>{index + 1}. {item.cound} {item.equipment} {item.description}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                : null}
                            <div>
                                <h3>Описание:</h3>
                                <span>{classroom.description}</span>
                            </div>
                            {user
                                ? <div>
                                    <h3>Контакты администратора:</h3>
                                    <span>{classroom.admin}
                                        {classroom.admin_contact_info
                                            ? <>, {classroom.admin_contact_info}</>
                                            : null
                                        }
                                    </span>
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