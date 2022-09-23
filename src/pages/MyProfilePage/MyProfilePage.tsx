import React, { useEffect } from 'react'
import "./MyProfilePage.scss"
import { useBookingStore } from '../../stores'
import BookingItem from './BookingItem'
import Footer from '../../components/Footer'

const MyProfilePage = () => {
    const { getBookingList, bookingList } = useBookingStore(state => state)

    const background = require("../../assets/background.png")

    useEffect(() => {
        getBookingList()
    }, [])

    return (
        <main>
            <section className={"booking-container"} style={{ backgroundImage: `url(${background})` }}>
                <div className={"bookingList-container"}>
                    <div className="blur"></div>
                    <h1>История брони</h1>
                    <div className={"booking-list header"}>
                        <div>Цель бронирования</div>
                        <div>Аудитория</div>
                        <div>Статус</div>
                        <div></div>
                    </div>
                    {bookingList &&
                        bookingList.map(item =>
                            <BookingItem bookingItem={item} key={item.id} />
                        )
                    }
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default MyProfilePage