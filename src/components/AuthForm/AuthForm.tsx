import React, { useState } from 'react'
import { useAuthStore } from '../../stores';
import { Button, IconLock, IconUser, Input, Loader } from '../UI';
import "./AuthForm.scss";


interface IProps {
    setLogInForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm: React.FC<IProps> = ({ setLogInForm }) => {
    const { logIn, loading } = useAuthStore(state => state);

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const authHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        logIn(login, password)
        setLogInForm(false)
    }

    return (
        <div>
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
                        name='login'
                        required
                    />
                    <Input
                        inputIcon={<IconLock color={"primary"} />}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        type="password"
                        placeholder='Введите ваш пароль'
                        id='password'
                        name='password'
                        required
                    />
                    <Button variant={!loading ? "primary" : "disabled"}>
                        {loading
                            ? <Loader />
                            : <span>Вход</span>
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AuthForm