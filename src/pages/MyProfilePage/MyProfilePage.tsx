import React, { useEffect, useState } from 'react'
import "./MyProfilePage.scss"
import { useBookingStore } from '../../stores'
import BookingItem from './BookingItem'
import Footer from '../../components/Footer'
import Pagination from '../../components/UI/Pagination'
import LoaderContainer from '../../components/LoaderContainer'
import useCookie from '../../hooks/useCookie'
import { Link } from 'react-router-dom'

const MyProfilePage = () => {
    const { getBookingList, bookingList, count, loading, isError } = useBookingStore(state => state)
    const [page, setPage] = useState(1)

    const { getCookie } = useCookie()

    useEffect(() => {
        const cookieUser = getCookie("user")
        if (cookieUser) {
            getBookingList(
                JSON.parse(cookieUser).token,
                {
                    page: page,
                    page_size: 10
                }
            )
        }
    }, [page])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main>
            {loading && <LoaderContainer />}
            {isError && <LoaderContainer isErrror />}
            <section className={"booking-container"}>
                <div className={"bookingList-container"}>
                    <h1>История брони</h1>
                    {bookingList
                        ? <>
                            <div className={"booking-list header"}>
                                <div>Цель бронирования</div>
                                <div>Аудитория</div>
                                <div>Статус</div>
                                <div></div>
                            </div>
                            {bookingList.map(item =>
                                <BookingItem bookingItem={item} key={item.id} />
                            )}
                        </>
                        : <div className={"no-applications"}>
                            <span>
                                У вас отсутствуют заявки на проведение мероприятий. <br />
                                Можете оставить заявку на <Link to={"/"}>главной странице</Link>.
                            </span>
                        </div>
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
        </main>
    )
}

export default MyProfilePage