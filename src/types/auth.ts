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
    logIn: (username: string, password: string) => void;
    logOut: () => void;
}