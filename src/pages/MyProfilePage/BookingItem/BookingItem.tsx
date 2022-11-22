import { link } from 'fs';
import React, { useEffect, useState } from 'react'
import { IconArrowDown, IconArrowUp } from '../../../components/UI';
import { IMyBooking } from '../../../types/booking';
import "./BookingItem.scss";


interface IProps {
    bookingItem: IMyBooking;
}

const statusLabel = {
    0: "В ожидании",
    1: "Отклонено",
    2: "Одобрено"
}

const BookingItem: React.FC<IProps> = ({ bookingItem }) => {
    const [showDesc, setShowDesc] = useState(false)

    const [equipments, setEquipments] = useState<string[]>([])

    const iconSize = window.matchMedia('(max-width: 800px)').matches ? 22 : 30;

    useEffect(() => {
        if (bookingItem.equipment) {
            setEquipments(bookingItem.equipment.split(", "))
        }
    }, [])

    return (
        <div className={"item-container"}>
            <div className={"booking-list item"} onClick={() => setShowDesc(!showDesc)}>
                <div className={"name"}>
                    {bookingItem.description}
                </div>
                <div>
                    {bookingItem.room.address}
                </div>
                <div
                    className={`status${bookingItem.status === 2 ? " success" : ""}${bookingItem.status === 0 ? " warning" : ""}${bookingItem.status === 1 ? " danger" : ""}`}
                >
                    <span>{statusLabel[bookingItem.status]}</span>
                </div>
                <div className="icon">
                    {showDesc
                        ? <IconArrowUp color={"black"} size={iconSize} />
                        : <IconArrowDown color={"black"} size={iconSize} />
                    }
                </div>
            </div>
            {showDesc
                ? <div className={"description"}>
                    <div className={"main-info-container"}>
                        <div className={"info-name"}>
                            <div>Описание мероприятия:</div>
                            <div>
                                {bookingItem.description}
                            </div>
                        </div>
                        <div>
                            <div>Даты бронирования:</div>
                            <div>
                                {bookingItem.booking_date_time.length
                                    ? <ul>
                                        {bookingItem.booking_date_time.map((date, index) =>
                                            <li key={index}>{date.date_end === date.date_start
                                                ? <>{new Date(date.date_start).toLocaleDateString()} с {date.start_time} по {date.end_time}</>
                                                : <>с {new Date(date.date_start).toLocaleDateString()} по {new Date(date.date_end).toLocaleDateString()}</>
                                            }</li>
                                        )}
                                    </ul>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div>
                            <div>Контактная информация:</div>
                            <div>
                                {bookingItem.contact_info}
                            </div>
                        </div>
                        <div>
                            <div>Забронированное дополнительное оборудование:</div>
                            <div>
                                {equipments.length
                                    ? <ul>
                                        {equipments.map((item, index) =>
                                            <li key={index}>{item}</li>
                                        )}
                                    </ul>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div>
                            <div>Контактная информация администратора:</div>
                            <div>{bookingItem.room.admin}, {bookingItem.room.admin_contact_info}</div>
                        </div>
                    </div>
                    {bookingItem.comment && bookingItem.comment.length
                        ?
                        <div className={"comments-container"}>
                            <div>
                                <div>Комментарий администратора:</div>
                                <div>{bookingItem.comment}</div>
                            </div>
                        </div>
                        : <></>
                    }
                </div>
                : <></>
            }
        </div>
    )
}

export default BookingItem