import MainLayout from "@/components/MainLayout";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import styles from "@/styles/Blog.module.css";

export default function Page({post, sourceMDX}) {
    return (
		<>
			<div className={styles.section + " " + styles.article}>
				<div className={styles.wrapper}>
					<div className={styles.meta}>
						<h1 className={styles.title}>{post.title}</h1>
						<span>
							<span className={styles.metaData}>{post.author}</span>
							<span className={styles.metaData}>{(new Date(post.createdAt)).toDateString()}</span>
						</span>
					</div>
					<hr/>
					<MDXRemote {...sourceMDX}/>
				</div>
			</div>
		</>
	)
}
Page.getLayout = function getLayout(page) {
	return (
		<MainLayout title={page.props.post.title} description={page.props.post.description}>
			{page}
		</MainLayout>
	)
};

export async function getStaticProps({params: {postid}}) {
	const { GetPost } = await import("@/lib/posts");

	const post = GetPost(postid);
	const sourceMDX = await serialize(post.content);

	return {
		props: {
			post,
			sourceMDX
		}
	}
}
export async function getStaticPaths() {
	const { GetPosts } = await import("@/lib/posts");
	const posts = GetPosts(true);
	const paths = [];
	
	for (const key in posts) {
		const post = posts[key];
		const id = post.id;
		paths.push({
			params: {postid: id}
		});
	}

	return {
		paths: paths,
		fallback: false
	}
}