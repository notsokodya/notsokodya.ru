import { GetUser } from "@/lib/user";

let currentStatus = {
    status: "",
    icon: ""
};

export default function handler(req, res) {
    if ( req.method === "POST" ) {
        const user = GetUser(req, res);
        if ( user && user.isAdmin() ) {
            const status = req.body.status;
            const icon = req.body.icon;
            if ( status ) {
                currentStatus.status = status;
                currentStatus.icon = icon || "shark";

                res.status(200).end();
            }
            res.status(400).end();
        }
        res.status(401).end();
    } else if ( req.method === "GET" ) {
        res.status(200).json({status: currentStatus.status, icon: currentStatus.icon});
    }

    res.status(404).end();
}