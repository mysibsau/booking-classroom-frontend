import Cookie from "js-cookie";

const setCookie = (cookieName: string, data: string) => {
    return Cookie.set(cookieName, data, {
        expires: 1,
        secure: true,
        sameSite: "strict",
        path: "/"
    });
};

const getCookie = (cookieName: string) => {
    return Cookie.get(cookieName);
};

const removeCookie = (cookieName: string) => {
    return Cookie.remove(cookieName);
};

const useCookie = () => {
    return {
        setCookie,
        getCookie,
        removeCookie
    };
};

export default useCookie; 