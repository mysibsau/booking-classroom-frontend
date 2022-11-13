export interface IAuth {
    token: string;
    name: string;
    id: number;
    username: string;
    password: string;
    role: 0 | 1 | 2;
}

export interface IAuthStore {
    user?: IAuth;
    loading: boolean;
    error?: string;
    setLogIn: (data: IAuth) => void;
    logIn: (username: string, password: string) => void;
    logOut: () => void;
}