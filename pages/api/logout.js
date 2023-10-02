import Cookie from "@/lib/cookies";
export default function handler(req, res) {
    if ( req.method === "POST" ) {
        const cookie = Cookie(req, res);
        cookie.removeCookie("user");
    }
    res.status(404).end();
}