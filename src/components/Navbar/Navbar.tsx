import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import { useAuthStore } from '../../stores';
import AuthForm from '../AuthForm';
import { Button, IconLogo, Modal } from '../UI';
import './Navbar.scss'


const Navbar = () => {
    const { logOut, user } = useAuthStore(state => state);
    const { removeCookie } = useCookie()

    const [logInForm, setLogInForm] = useState(false)

    const [burgerActive, setBurgerActive] = useState(false)

    const clickBtnLogout = () => {
        removeCookie("user")
        logOut()
    }

    const imgSize = window.matchMedia('(max-width: 1000px)').matches ? 300 : 480
    const isMobile = window.matchMedia('(max-width: 800px)').matches

    return (
        <div className={'navbar'}>
            <div className={'navbar-left'}>
                <a href={'https://www.sibsau.ru/'} className={"logo"}>
                    <IconLogo size={imgSize} />
                </a>
            </div>
            {user
                ? <>
                    <div className={'navbar-right'}>
                        <div onClick={() => setBurgerActive(!burgerActive)} className={`hamburger${burgerActive ? " active" : ""}`}>
                            <span className="bar-1"></span>
                            <span className="bar-2"></span>
                            <span className="bar-3"></span>
                        </div>
                        <nav className={`${burgerActive ? " active" : ""}`}>
                            <ul>
                                <li>
                                    <NavLink to={"/"} className={"navLink"}><span>Главная</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/my-profile"} className={"navLink"}><span>Мои заявки</span></NavLink>
                                </li>
                                <li className={'userInfo'}>
                                    <NavLink to={"/my-profile"}><span className={"name"}>{user.name}</span></NavLink>
                                </li>
                                <li className={"buttons-container"}>
                                    {isMobile
                                        ? <span onClick={() => clickBtnLogout()} className='logOut'>Выйти</span>
                                        : <Button onClick={() => clickBtnLogout()} variant={"default"}>Выйти</Button>
                                    }

                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
                :
                <div className={'logIn-button'}>
                    <Button onClick={() => setLogInForm(true)} variant={"default"}>Войти</Button>
                </div>
            }
            <Modal isShow={logInForm} setIsShow={setLogInForm}>
                <AuthForm setLogInForm={setLogInForm} />
            </Modal>
        </div >
    );
};

export default Navbar;