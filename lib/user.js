import Cookie from "./cookies";
import Database from "./database";

Database.exec("CREATE TABLE IF NOT EXISTS users (username TEXT, id TEXT, token TEXT, rank TEXT);");

const UsersCache = {};
const Ranks = {
    admin: {
        perms: {
            ["*"]: true
        }
    },
    verified: {
        perms: {
            media: true,
            private: true
        }
    },
    member: {
        perms: {
            private: true
        }
    }
}

class User {
    username    = "";
    id          = "";
    rank        = "";
    #token      = "";

    constructor (username, token, id, rank) {
        this.username   = username;
        this.#token     = token;
        this.rank       = rank;
        this.id         = id;
    }

    isAdmin() {
        return this.rank === "admin";
    }
    hasPermission(perm) {
        if ( this.isAdmin() ) return true;
        if (this.rank && Ranks[this.rank]) {
            const perms = Ranks[this.rank].perms;
            if ( perms[perm] ) return true;
        }

        return false
    }
    getToken() {
        return this.#token
    }
}
function GetUser_Internal(token) {
    if ( UsersCache[token] ) return UsersCache[token];

    const userData = Database.prepare("SELECT * FROM users WHERE token = ?").get(token);
    if ( userData ) {
        const user = new User(userData.username, token, userData.id, userData.rank);
        UsersCache[token] = user;

        return user
    }
}

function GetUser(req, res) {
    const cookie = Cookie(req, res);

    if ( cookie ) {
        const userData = cookie.getCookie("user", true);
        if ( userData && userData.token )
            return GetUser_Internal(userData.token);
    }
}

export { GetUser, GetUser_Internal };