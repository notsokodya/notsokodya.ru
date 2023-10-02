import matter from "gray-matter";
import Database from "./database";


Database.exec("CREATE TABLE IF NOT EXISTS posts (id TEXT, author TEXT, createdAt TEXT, content TEXT, private INTEGER)");

const posts = {};
const posts_list = {
    public: [],
    every: []
};

function AddPost(id, content_raw, author, privated) {
    const exist = Database.prepare("SELECT 1 FROM posts WHERE id = ?").get(id);
    if ( exist ) return false;
    
    const createdAt = (new Date()).toISOString();
    Database.prepare("INSERT INTO posts (id, author, createdAt, content, private) VALUES(?, ?, ?, ?, ?)").run(id, author.username, createdAt, content_raw, privated ? 1 : 0);

    const { data, content } = matter(content_raw);
    posts[id] = {
        title: data.title || id,
        description: data.description || "",
        private: privated,
        author: author,
        createdAt: createdAt,
        content: content
    };

    const list_post = {
        title: data.title || id,
        description: data.description || "",
        private: privated,
        author: author,
        createdAt: createdAt,
        id: id
    };
    posts_list.every.push(list_post);
    if ( !privated ) posts_list.public.push(list_post);
}
function GetPost(id, useDB) {
    if ( posts[id] ) return posts[id];
    if ( useDB ) {
        const post = Database.prepare("SELECT * FROM posts WHERE id = ?").get(id);
        posts[id] = post;

        return post
    }
}
function ModifyPost(id, data, privated) {
    
}
function GetPosts(revalidate) {
    if ( revalidate ) {
        posts_list.every = [];
        posts_list.public = [];
        const posts_db = Database.prepare("SELECT * FROM posts").all();
        for (const postKey in posts_db) {
            const post = posts_db[postKey];

            const { data, content } = matter(post.content);

            posts[post.id] = {
                title: data.title || post.id,
                description: data.description || "",
                private: post.private,
                author: post.author,
                createdAt: post.createdAt,
                content: content
            };
    
            const post_list = {
                title: data.title || post.id,
                description: data.description || "",
                private: post.private,
                author: post.author,
                createdAt: post.createdAt,
                id: post.id
            };
            posts_list.every.push(post_list);
            if ( !post.private ) 
                posts_list.public.push(post_list);
        }
        
        posts_list.every.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime()
        });
        posts_list.public.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime()
        });


        return posts_list.every
    } else {
        return posts_list.every
    }
}
function GetPostsUser(user) {
    if ( user && user.hasPermission("private") ) {
        return posts_list.every;
    } else {
        return posts_list.public;
    }
}

(() => {
    const posts_db = Database.prepare("SELECT * FROM posts").all();
    for (const postKey in posts_db) {
        const post = posts_db[postKey];

        const { data, content } = matter(post.content);

        posts[post.id] = {
            title: data.title || post.id,
            description: data.description || "",
            private: post.private,
            author: post.author,
            createdAt: post.createdAt,
            content: content
        };

        const post_list = {
            title: data.title || post.id,
            description: data.description || "",
            private: post.private,
            author: post.author,
            createdAt: post.createdAt,
            id: post.id
        };
        posts_list.every.push(post_list);
        if ( !post.private ) 
            posts_list.public.push(post_list);
    }

    posts_list.every.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime()
    });
    posts_list.public.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime()
    });
})();


export { AddPost, ModifyPost, GetPost, GetPosts, GetPostsUser }