import React, { useEffect } from 'react'
import "./MainPage.scss";
import ClassroomList from './ClassroomList';
import Header from './Header/Header';
import Rules from './Rules';
import Team from './Team';
import Footer from '../../components/Footer';
import { useClassroomStore } from '../../stores';
import LoaderContainer from '../../components/LoaderContainer';

const MainPage = () => {
    const { loading, isError } = useClassroomStore(state => state)

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