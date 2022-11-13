import React, { useEffect } from 'react'
import "./MainPage.scss";
import ClassroomList from './ClassroomList';
import Header from './Header/Header';
import Rules from './Rules';
import Team from './Team';
import Footer from '../../components/Footer';
import { useAuthStore, useClassroomStore } from '../../stores';
import LoaderContainer from '../../components/LoaderContainer';
import { useNotification } from '../../components/UI';
import useCookie from '../../hooks/useCookie';

const MainPage = () => {
    const { loading, isError } = useClassroomStore(state => state)
    const { error, user, setLogIn } = useAuthStore(state => state)
    const { addNotific } = useNotification()
    const { getCookie, setCookie } = useCookie()

    useEffect(() => {
        if (error) {
            addNotific({
                title: "Ошибка авторизации",
                body: error,
                type: "danger"
            })
        }
    }, [error])

    useEffect(() => {
        if (user) {
            setCookie("user", JSON.stringify(user))
        } else {
            const cookieUser = getCookie("user")
            if (cookieUser) {
                setLogIn(JSON.parse(cookieUser))
            }
        }
    }, [user])

    return (
        <main className={"mainPage-container"}>
            {loading && <LoaderContainer />}
            {isError && <LoaderContainer isErrror />}
            <Header />
            <Rules />
            <ClassroomList />
            <Team />
            <Footer />
        </main>
    )
}

export default MainPage