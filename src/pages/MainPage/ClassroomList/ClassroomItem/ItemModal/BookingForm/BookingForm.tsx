import React, { useEffect, useState } from 'react'
import "./BookingForm.scss"

import { DayPicker, DateRange } from 'react-day-picker';

import ru from 'date-fns/locale/ru';
import 'react-day-picker/dist/style.css';

import { IBookingDates, IClassroom } from '../../../../../../types/classroom';
import { useAuthStore, useBookingStore, useClassroomStore } from '../../../../../../stores';
import { Button, Input, Select, Textarea } from '../../../../../../components/UI';
import { NavLink } from 'react-router-dom';

const statusOpt = [
    { id: "0", name: "Студент" },
    { id: "1", name: "Сотрудник" }
]

interface IProps {
    classroom: IClassroom;
    setLogInForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingForm: React.FC<IProps> = ({ classroom, setLogInForm }) => {
    const { user } = useAuthStore(state => state)
    const { createBooking } = useBookingStore(state => state)
    const { staticData } = useClassroomStore(state => state)

    const [allDay, setAllDay] = useState(false);

    const [contacts, setontacts] = useState("")
    const [userPosition, setUserPosition] = useState("")
    const [userStatus, setUserStatus] = useState("0")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")

    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:59");

    const [equipments, setEquipments] = useState("")

    const [selectedDay, setSelectedDay] = useState<Date | undefined>();
    const [selectedManyDays, setSelectedManyDays] = useState<DateRange | undefined>();
    const [dateTimeLabel, setDateTimeLabel] = useState("")

    const [showCalendar, setShowCalendar] = useState(false)

    const [bookingConfirm, setBookingConfirm] = useState(false)


    const createBookingHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (e.target) {
            const newBookingDates: IBookingDates[] = []
            if (allDay) {
                if (selectedManyDays && selectedManyDays.from && selectedManyDays.to) {
                    newBookingDates.push({
                        date_start: selectedManyDays.from.toISOString().split("T")[0],
                        date_end: selectedManyDays.to.toISOString().split("T")[0],
                        end_time: null,
                        start_time: null
                    })
                }
            } else {
                if (selectedDay) {
                    newBookingDates.push({
                        date_start: selectedDay.toISOString().split("T")[0],
                        date_end: selectedDay.toISOString().split("T")[0],
                        end_time: endTime,
                        start_time: startTime
                    })
                }
            }

            if (newBookingDates.length) {
                createBooking(
                    {
                        title: name,
                        contact_info: contacts,
                        equipment: equipments,
                        room: classroom.id,
                        description: description,
                        position: userPosition,
                        personal_status: parseInt(userStatus),
                        booking_date_time: newBookingDates
                    }
                )
                setBookingConfirm(false)
            }
        }
    }

    useEffect(() => {
        let newLabel = ""

        if (allDay) {
            if (selectedManyDays && selectedManyDays.from) {
                newLabel += "с " + selectedManyDays.from.toLocaleDateString()
            }
            if (selectedManyDays && selectedManyDays.to) {
                newLabel += " по " + selectedManyDays.to.toLocaleDateString()
            }
        } else {
            if (selectedDay) {
                newLabel += selectedDay.toLocaleDateString() + ` с ${startTime} по ${endTime}`
            }
        }

        setDateTimeLabel(newLabel)
    }, [selectedDay, selectedManyDays, allDay])

    return (
        <>
            {!bookingConfirm
                ? <>
                    <div className={"booking-form"}>
                        {user
                            ? <form onSubmit={createBookingHandler}>
                                <h3>Забронируйте аудиторию:</h3>
                                <div>
                                    <div className={"description"}>
                                        <label>Название мероприятия</label>
                                        <Input value={name} type={"text"} onChange={setName} placeholder={"Название мероприятия"} required />
                                    </div>
                                    <div className={"description"}>
                                        <label>Описание мероприятия</label>
                                        <Textarea value={equipments} onChange={setEquipments} placeholder={staticData.pseudo_text_booking} required rows={5} />
                                    </div>
                                    <div className={"description"}>
                                        <label>Дополнительное оборудование</label>
                                        <Textarea value={description} onChange={setDescription} placeholder={staticData.pseudo_text_equipment} required rows={5} />
                                    </div>
                                    <div>
                                        <label>Укажите ваш номер телефона</label>
                                        <Input value={contacts} onChange={setontacts} type={"text"} placeholder={"Ваш контактный телефон"} required />
                                    </div>
                                    <div>
                                        <label>
                                            {parseInt(userStatus) === 0
                                                ? <>Ваша группа</>
                                                : <>Ваша должность</>
                                            }

                                        </label>
                                        <Input
                                            type={"text"}
                                            value={userPosition}
                                            onChange={setUserPosition}
                                            placeholder={parseInt(userStatus) === 0 ? "Ваша группа" : "Ваша должность"}
                                            required
                                        />
                                    </div>
                                    {showCalendar && <div className={"close-day-picker-container"} onClick={() => setShowCalendar(false)}></div>}
                                    <div className={"datePicker"} onFocus={() => setShowCalendar(true)}>
                                        <label>Даты бронирования</label>
                                        <Input type={"text"} value={dateTimeLabel} placeholder={"Укажите даты бронирования"} readonly />
                                        {showCalendar
                                            ? <div className={"day-picker-container"}>
                                                {allDay
                                                    ? <div>
                                                        <DayPicker
                                                            locale={ru}
                                                            mode={"range"}
                                                            selected={selectedManyDays}
                                                            onSelect={setSelectedManyDays}
                                                        />
                                                        <div className="allDay-container">
                                                            <input type="checkbox" id={`allDayCheck-${classroom.id}`} checked={allDay} onChange={() => setAllDay(!allDay)} />
                                                            <label htmlFor={`allDayCheck-${classroom.id}`}>Весь день</label>
                                                        </div>
                                                    </div>
                                                    : <div>
                                                        <DayPicker
                                                            locale={ru}
                                                            mode={"single"}
                                                            selected={selectedDay}
                                                            onSelect={setSelectedDay}
                                                        />

                                                        <div className="allDay-container">
                                                            <input type="checkbox" id={`allDayCheck-${classroom.id}`} checked={allDay} onChange={() => setAllDay(!allDay)} />
                                                            <label htmlFor={`allDayCheck-${classroom.id}`}>Весь день</label>
                                                        </div>
                                                        <div className="datetime">
                                                            <Input type={"time"} value={startTime} onChange={setStartTime} />
                                                            <Input type={"time"} value={endTime} onChange={setEndTime} />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                    <div>
                                        <label>Ваш статус</label>
                                        <Select
                                            options={statusOpt}
                                            value={userStatus}
                                            setValue={setUserStatus}
                                        />
                                    </div>
                                </div>
                                <Button variant={"primary"}>
                                    Отправить
                                </Button>
                            </form>
                            : <h3>
                                Бронирование аудитории доступно только после <span onClick={() => setLogInForm(true)}>авторизации</span>
                            </h3>
                        }
                    </div>
                </>
                : <h1 className={"confirm-message"}>
                    Заявка отправлена! Вы можете отслеживать статус заявки на странице <NavLink to={"/my-profile/"}>Мои заявки</NavLink>
                </h1>
            }

        </>

    )
}

export default BookingForm