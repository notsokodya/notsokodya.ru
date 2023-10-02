import Cookies from "cookies";

export default function Cookie(req, res) {
    if (!res || !res) return null;
    const cookies = new Cookies(req, res);
    
    return {
        setCookie: (name, data, expires) => 
            cookies.set(name, typeof data === "object" ? JSON.stringify(data) : data, {
                httpOnly: true,
                expires
            }),
        getCookie: (name, isParse) => {
            const data = cookies.get(name);
            if (!data) return null;
            if (isParse) return JSON.parse(data);
            return data;
        },
        removeCookie: (name) => 
            cookies.set(name, null, {
                httpOnly: true,
                expires: new Date()
            })
    }
};