import React from 'react'
import "./MainPage.scss";
import ClassroomList from './ClassroomList';
import Header from './Header/Header';
import Rules from './Rules';
import Team from './Team';
import Footer from '../../components/Footer';

const MainPage = () => {    
    return (
        <main className={"mainPage-container"}>
            <Header />
            <Rules />
            <ClassroomList />
            <Team />
            <Footer />
        </main>
    )
}

export default MainPage