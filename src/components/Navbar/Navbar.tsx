import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import { Button, IconLock, IconLogo, IconUser, Input, Loader, Modal } from '../UI';
import './Navbar.scss'

const Navbar = () => {
    const { logOut, user, logIn, loading } = useAuthStore(state => state);
    const [logInForm, setLogInForm] = useState(false)

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const clickBtnLogout = () => {
        logOut()
        window.location.reload()
    }

    const authHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        logIn(login, password)
        setLogInForm(false)
    }

    return (
        <div className={'navbar'}>
            <nav>
                <div className={'navbar-left'}>
                    <NavLink to={'/'} className={"logo"}>
                        <IconLogo />
                        {/* <img src={logo} alt="" /> */}
                    </NavLink>
                </div>
                {/* <div className={"navbar-center"}>
                    <span>
                        Бронирование аудиторий В СИБГУ
                    </span>
                </div> */}
                <div className={'navbar-right'}>
                    {user
                        ? <div>
                            <div className={'userInfo'}>
                                <div className="blur"></div>
                                <Link to={"/my-profile"}><span className={"name"}>{user.name}</span></Link>
                            </div>
                            <div className={"buttons-container"}>
                                <Button onClick={() => clickBtnLogout()} variant={"primary"}>Выйти</Button>
                            </div>
                        </div>
                        : <div>
                            <div className={"buttons-container"}>
                                <Button onClick={() => setLogInForm(true)} variant={"primary"}>Войти</Button>
                            </div>
                        </div>
                    }
                </div>
            </nav>
            <Modal isShow={logInForm} setIsShow={setLogInForm}>
                <div className={"auth-container"}>
                    <form onSubmit={authHandler}>
                        <h1>Вход</h1>
                        <p>Войдите в свой аккаунт</p>
                        <Input
                            inputIcon={<IconUser color={"primary"} />}
                            type="text"
                            placeholder='Введите ваш логин'
                            value={login}
                            onChange={(value) => setLogin(value)}
                            id='login'
                            required
                        />
                        <Input
                            inputIcon={<IconLock color={"primary"} />}
                            value={password}
                            onChange={(value) => setPassword(value)}
                            type="password"
                            placeholder='Введите ваш пароль'
                            id='password'
                            required
                        />
                        <Button variant={!loading ? "primary" : "disabled"}>
                            {loading
                                ? <Loader height={20} width={20} />
                                : <span>Вход</span>
                            }
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Navbar;