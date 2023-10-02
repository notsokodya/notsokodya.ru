import { createHash } from "node:crypto";
import Cookie from "@/lib/cookies";
import { GetUser_Internal } from "@/lib/user";

const cooldowns = {
    list: {},
    addCooldown(ip, seconds) {
        const cooldown = new Date();
        cooldown.setSeconds(cooldown.getSeconds() + seconds);

        this.list[ip] = cooldown;
    },
    checkCooldown(ip) {
        if ( !this.list[ip] ) return false;
        const cur = new Date();

        if ( this.list[ip].getTime() < cur.getTime() ) {
            this.list[ip] = undefined;
            return false
        }
        return true
    }
};
export default function handler(req, res) {
    if ( req.method === "POST" ) {
        const body = req.body;
        if ( !body || !body.password || !body.username ) return res.status(400).end();
        if ( cooldowns.checkCooldown(req.headers['x-forwarded-for']) ) return res.status(400).end();

        const hash = createHash("sha256").update(req.body.username + "@" + req.body.password).digest("hex");
        const user = GetUser_Internal(hash);

        if ( !user ) {
            cooldowns.addCooldown(req.headers['x-forwarded-for'], 3);
            return res.status(401).end();
        } else {
            const cookie = Cookie(req, res);
            const expire = new Date();
            expire.setDate(expire.getDate() + 7); // 7 days

            cookie.setCookie("user", JSON.stringify({
                username: user.username,
                id: user.id,
                token: user.getToken()
            }));
            return res.status(200).end();
        }
    }
    res.status(404).end();
}