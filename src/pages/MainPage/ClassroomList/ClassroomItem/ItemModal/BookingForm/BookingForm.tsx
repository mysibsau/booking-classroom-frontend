import React, { useEffect, useState } from 'react'
import "./BookingForm.scss"

import { DayPicker, DateRange } from 'react-day-picker';

import ru from 'date-fns/locale/ru';
import 'react-day-picker/dist/style.css';

import { IBookingDates, IClassroom } from '../../../../../../types/classroom';
import { useAuthStore, useBookingStore, useClassroomStore } from '../../../../../../stores';
import { Button, Input, InputTime, Select, Textarea } from '../../../../../../components/UI';
import { Link } from 'react-router-dom';
import { getLockDates, getLockTimes } from './BookingFormHealper';
import useCookie from '../../../../../../hooks/useCookie';

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

    const { getCookie } = useCookie()

    const [allDay, setAllDay] = useState(false);

    const [contacts, setContacts] = useState("")
    const [userPosition, setUserPosition] = useState("")
    const [userStatus, setUserStatus] = useState("0")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")

    const [startTime, setStartTime] = useState("--:--");
    const [endTime, setEndTime] = useState("--:--");
    const [dateTimeLabel, setDateTimeLabel] = useState("")
    const [freeTimes, setFreeTimes] = useState<string[]>()
    const [freeTimesEnd, setFreeTimesEnd] = useState<string[]>([])

    const [equipments, setEquipments] = useState("")

    const [hiddenDates, setHiddenDates] = useState<Date[]>()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>();
    const [selectedManyDays, setSelectedManyDays] = useState<DateRange | undefined>();

    const [showCalendar, setShowCalendar] = useState(false)

    const [bookingConfirm, setBookingConfirm] = useState(false)

    const setDefaultState = () => {
        setAllDay(false)
        setContacts("")
        setUserPosition("")
        setUserStatus("0")
        setDescription("")
        setName("")
        setStartTime("--:--")
        setEndTime("--:--")
        setDateTimeLabel("")
        setFreeTimes(undefined)
        setFreeTimesEnd([])
        setEquipments("")
        setHiddenDates(undefined)
        setSelectedDay(undefined)
        setSelectedManyDays(undefined)
        setShowCalendar(false)

        setBookingConfirm(true)
    }

    const createBookingHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (e.target) {
            const newBookingDates: IBookingDates[] = []
            if (allDay) {
                if (selectedManyDays && selectedManyDays.from && selectedManyDays.to) {
                    newBookingDates.push({
                        date_start: new Date(selectedManyDays.from.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0],
                        date_end: new Date(selectedManyDays.to.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0],
                        end_time: null,
                        start_time: null
                    })
                }
            } else {
                if (selectedDay) {
                    newBookingDates.push({
                        date_start: new Date(selectedDay.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0],
                        date_end: new Date(selectedDay.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0],
                        end_time: endTime,
                        start_time: startTime
                    })
                }
            }

            if (newBookingDates.length) {
                const cookieUser = getCookie("user")
                if (cookieUser) {
                    createBooking(
                        JSON.parse(cookieUser).token,
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
                    setDefaultState()
                }
            }
        }
    }

    useEffect(() => {
        if (classroom.bookings_in_room) {
            setHiddenDates(getLockDates(classroom.bookings_in_room))
        }
    }, [])

    useEffect(() => {
        if (classroom.bookings_in_room && selectedDay && freeTimes) {
            const selectDay = new Date(selectedDay.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0]
            const { lockTimes } = getLockTimes(classroom.bookings_in_room, selectDay)
            const lockedTimes = lockTimes.filter(item => item > startTime)

            if (lockedTimes.length) {
                setFreeTimesEnd(freeTimes.filter(item => item > startTime && item <= lockedTimes[0]))
            } else {
                setFreeTimesEnd(freeTimes.filter(item => item > startTime))
            }
        } else {
            setFreeTimesEnd([])
        }
        setEndTime("--:--")
    }, [startTime])

    useEffect(() => {
        let newLabel = ""
        let lockedDates = []

        if (allDay) {
            if (selectedManyDays && selectedManyDays.from && selectedManyDays.to && hiddenDates) {
                lockedDates = getLockDates([{
                    date_start: new Date(selectedManyDays.from.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0],
                    date_end: new Date(selectedManyDays.to.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0],
                    end_time: null,
                    start_time: null
                }]).map(item => new Date(item.setHours(0)).getTime());

                for (const item of lockedDates) {
                    if (hiddenDates.map(item => new Date(item.setHours(0)).getTime()).includes(item)) {
                        setSelectedManyDays({
                            from: undefined,
                            to: undefined
                        })
                        return
                    }
                }

                newLabel += "с " + selectedManyDays.from.toLocaleDateString() + " по " + selectedManyDays.to.toLocaleDateString()
            }

        } else {
            if (classroom.bookings_in_room && selectedDay) {
                const selectDay = new Date(selectedDay.getTime() + 1000 * 60 * 60 * 24).toISOString().split("T")[0]
                const { freeTimes } = getLockTimes(classroom.bookings_in_room, selectDay)

                setFreeTimes(freeTimes)

                newLabel += selectedDay.toLocaleDateString() + ` с ${startTime} по ${endTime}`
            }
        }

        setDateTimeLabel(newLabel)
    }, [selectedDay, selectedManyDays, allDay, startTime, endTime])

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
                                        <Textarea value={description} onChange={setDescription} placeholder={staticData.pseudo_text_booking} required rows={5} />
                                    </div>
                                    <div className={"description"}>
                                        <label>Дополнительное оборудование</label>
                                        <Textarea value={equipments} onChange={setEquipments} placeholder={staticData.pseudo_text_equipment} rows={5} />
                                    </div>
                                    <div>
                                        <label>Укажите ваш номер телефона</label>
                                        <Input value={contacts} onChange={setContacts} type={"tel"} placeholder={"Ваш контактный телефон"} required />
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
                                        <Input type={"text"} value={dateTimeLabel} placeholder={"Укажите даты бронирования"} required readonly />
                                        {showCalendar
                                            ? <div className={"day-picker-container"}>
                                                {allDay
                                                    ? <div>
                                                        <DayPicker
                                                            locale={ru}
                                                            mode={"range"}
                                                            selected={selectedManyDays}
                                                            onSelect={setSelectedManyDays}
                                                            hidden={hiddenDates}
                                                        />
                                                        <div className="allDay-container">
                                                            <label htmlFor={`allDayCheck-${classroom.id}`}>
                                                                <input type="checkbox" id={`allDayCheck-${classroom.id}`} checked={allDay} onChange={() => setAllDay(!allDay)} />
                                                                Весь день
                                                            </label>
                                                        </div>
                                                    </div>
                                                    : <div>
                                                        <DayPicker
                                                            locale={ru}
                                                            mode={"single"}
                                                            selected={selectedDay}
                                                            onSelect={setSelectedDay}
                                                            hidden={hiddenDates}
                                                        />

                                                        <div className="allDay-container">
                                                            <label htmlFor={`allDayCheck-${classroom.id}`}>
                                                                <input type="checkbox" id={`allDayCheck-${classroom.id}`} checked={allDay} onChange={() => setAllDay(!allDay)} />
                                                                Весь день
                                                            </label>
                                                        </div>
                                                        {freeTimes &&
                                                            <div className="datetime">
                                                                <InputTime times={freeTimes} value={startTime} onChange={setStartTime} />
                                                                <InputTime times={freeTimesEnd} value={endTime} onChange={setEndTime} />
                                                            </div>
                                                        }
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
                    Заявка отправлена! Вы можете отслеживать статус заявки на странице <Link to={"/my-profile"}>Мои заявки</Link>
                </h1>
            }
        </>

    )
}

export default BookingForm