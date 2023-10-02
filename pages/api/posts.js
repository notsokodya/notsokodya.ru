import { GetUser } from "@/lib/user";
import { AddPost, ModifyPost, GetPost, GetPostsUser } from "@/lib/posts";

export default function handler(req, res) {
    if ( req.method === "GET" ) {
        const user = GetUser(req, res);
        const id = req.query.id;

        if ( id ) {
            const post = GetPost(id);
            if ( post ) {
                if ( post.private && !user || !user.hasPermission("private") )
                    return res.status(401).end();
                
                return res.status(200).json(post);
            }
        } else {
            const posts = GetPostsUser(user);
            res.status(200).json(posts);
        }

        res.status(404).end();
    } else if ( req.method === "POST" ) {
        const user = GetUser(req, res);
        if ( !user || !user.isAdmin() ) return res.status(401).end();
        
        AddPost(req.body.id, req.body.data, user, req.body.private || false);
        res.status(200).end();
    } else if ( req.method === "DELETE" ) {
        const user = GetUser(req, res);
        if ( !user || !user.isAdmin() ) return res.status(401).end();

        
    }

    res.status(404).end();
}