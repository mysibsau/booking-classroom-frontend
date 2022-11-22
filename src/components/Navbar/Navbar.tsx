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

    const clickBtnLogout = () => {
        removeCookie("user")
        logOut()
    }

    return (
        <div className={'navbar'}>
            <nav>
                <div className={'navbar-left'}>
                    <a href={'https://www.sibsau.ru/'} className={"logo"}>
                        <IconLogo />
                    </a>
                </div>
                {user
                    ? <div className={"navbar-center"}>
                        <span>
                            <NavLink to={"/"}><span className={"name"}>Главная</span></NavLink>
                        </span>
                        <span>
                            <NavLink to={"/my-profile"}><span className={"name"}>Мои заявки</span></NavLink>
                        </span>
                    </div>
                    : <></>
                }
                <div className={'navbar-right'}>
                    {user
                        ? <div>
                            <div className={'userInfo'}>
                                <NavLink to={"/my-profile"}><span className={"name"}>{user.name}</span></NavLink>
                            </div>
                            <div className={"buttons-container"}>
                                <Button onClick={() => clickBtnLogout()} variant={"default"}>Выйти</Button>
                            </div>
                        </div>
                        : <div>
                            <div className={"buttons-container"}>
                                <Button onClick={() => setLogInForm(true)} variant={"default"}>Войти</Button>
                            </div>
                        </div>
                    }
                </div>
            </nav>
            <Modal isShow={logInForm} setIsShow={setLogInForm}>
                <AuthForm setLogInForm={setLogInForm} />
            </Modal>
        </div >
    );
};

export default Navbar;