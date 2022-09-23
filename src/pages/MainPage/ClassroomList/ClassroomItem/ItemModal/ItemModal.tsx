import React, { useEffect, useState } from 'react'
import { Button, Carousel, CarouselItem, Input, Textarea } from '../../../../../components/UI';
import { useAuthStore, useBookingStore } from '../../../../../stores';
import { IBookingDates, IClassroom } from '../../../../../types/classroom'
import "./ItemModal.scss";


interface IProps {
    classroom: IClassroom
}

const ItemModal: React.FC<IProps> = ({ classroom }) => {
    const { user } = useAuthStore(state => state)
    const { createBooking } = useBookingStore(state => state)

    const [allDay, setAllDay] = useState(false);

    const [contacts, setontacts] = useState("")
    const [messangers, setMessangers] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [userPosition, setUserPosition] = useState("")
    const [description, setDescription] = useState("")

    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:59");

    const [dateStart, setDateStart] = useState(new Date().toISOString().split("T")[0]);
    const [dateEnd, setDateEnd] = useState(new Date().toISOString().split("T")[0]);

    const createBookingHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (e.target) {
            const newBookingDates: IBookingDates[] = []
            if (allDay) {
                
            } else {
                newBookingDates.push({
                    date: dateStart,
                    end_time: endTime,
                    start_time: startTime
                })
            }

            createBooking(
                {
                    contact_info: contacts,
                    equipment: "Стул: 1, Стол: 2, Проектор: 1",
                    room: classroom.id,
                    description: description,
                    position: userPosition,
                    personal_status: 0,
                    booking_date_time: newBookingDates
                }
            )
        }
    }

    useEffect(() => {
        let v1, v2

        if (dateStart.length) {
            v1 = new Date(dateStart)
            console.log(v1.toISOString());
        }
        if (dateEnd.length) {
            v2 = new Date(dateEnd)
            console.log(v2.toISOString());
        }

        if (v1 && v2) {
            console.log(v1 > v2);
        }

    }, [dateStart, dateEnd])


    return (
        <div className={"itemModal-container"}>
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
                            {classroom.equipment.map(item =>
                                <li key={item.id}>
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
            <div className={"booking-form"}>
                {user
                    ? <form onSubmit={createBookingHandler}>
                        <h3>Забронируйте аудиторию:</h3>
                        <div>
                            <div className={"description"}>
                                <label>Цель бронирования</label>
                                <Textarea value={description} onChange={setDescription} placeholder={"Цель бронирования"} required />
                            </div>
                            <div>
                                <label>Как с вами связаться (телефон или ссылка на соцесети)</label>
                                <Input value={contacts} onChange={setontacts} type={"text"} placeholder={"Ваш контактный телефон"} required />
                            </div>
                            <div>
                                <label>Ссылка на соц.сети</label>
                                <Input value={messangers} onChange={setMessangers} type={"text"} placeholder={"Ссылка на соц.сети"} required />
                            </div>
                            <div>
                                <label>Ваш статус</label>
                                <Input value={userStatus} onChange={setUserStatus} type={"text"} placeholder={"Ваш статус"} required />
                            </div>
                            <div>
                                <label>Ваша должность</label>
                                <Input value={userPosition} onChange={setUserPosition} type={"text"} placeholder={"Ваша должность"} required />
                            </div>
                            <div className={"datePicker"}>
                                <label>Даты бронирования</label>
                                {allDay
                                    ?
                                    <div className="dates">
                                        <Input type={"date"} value={dateStart} onChange={setDateStart} />
                                        <Input type={"date"} value={dateEnd} onChange={setDateEnd} />
                                    </div>
                                    :
                                    <div className="datetime">
                                        <Input type={"date"} value={dateStart} onChange={setDateStart} />
                                        <Input type={"time"} value={startTime} onChange={setStartTime} />
                                        <Input type={"time"} value={endTime} onChange={setEndTime} />
                                    </div>
                                }
                                <div className="allDay-container">
                                    <input type="checkbox" id={`allDayCheck-${classroom.id}`} checked={allDay} onChange={() => setAllDay(!allDay)} />
                                    <label htmlFor={`allDayCheck-${classroom.id}`}>Весь день</label>
                                </div>
                            </div>
                        </div>
                        <Button variant={"primary"}>
                            Отправить
                        </Button>
                    </form>
                    : <h3>Бронирование аудитории доступно только после авторизации</h3>
                }
            </div>
        </div>
    )
}

export default ItemModal