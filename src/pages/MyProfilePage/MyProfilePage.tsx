import React, { useEffect, useState } from 'react'
import "./MyProfilePage.scss"
import { useBookingStore } from '../../stores'
import BookingItem from './BookingItem'
import Footer from '../../components/Footer'
import Pagination from '../../components/UI/Pagination'
import LoaderContainer from '../../components/LoaderContainer'

const MyProfilePage = () => {
    const { getBookingList, bookingList, count, loading } = useBookingStore(state => state)
    const [page, setPage] = useState(1)

    const background = require("../../assets/background.png")

    useEffect(() => {
        getBookingList({
            page: page,
            page_size: 10
        })
    }, [page])
    
    return (
        <main>
            {!loading
                ? <>
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
                        {count > 10
                            ?
                            <div className={"pagination-container"}>
                                <Pagination count={count} page={page} setPage={setPage} perPage={10} />
                            </div>
                            : <></>
                        }
                    </section>
                    <Footer />
                </>
                : <LoaderContainer />
            }
        </main>
    )
}

export default MyProfilePage