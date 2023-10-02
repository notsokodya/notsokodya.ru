import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/Blog.module.css";

export default function Page() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("/api/posts").then(res => res.json()).then(data => {
			setPosts(data);
		});
	}, []);

    return (
		<>
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<h1>My Blog :3</h1>
					<ul className={styles.posts}>
					{
						posts.map(post => {
							return (
								<>
									<li>
										<Link href={`/blog/${post.id}`} className={styles.post}>
											<span>
												<h1 className={styles.title}>{post.title}</h1>
												<p className={styles.description}>{post.description}</p>
											</span>
											<span className={styles.meta}>
												<p>{(new Date(post.createdAt)).toDateString()}</p>
												<p>{post.author}</p>
											</span>
										</Link>
									</li>
								</>
							)
						})
					}
					</ul>
				</div>
			</div>
		</>
	)
}
Page.getLayout = function getLayout(page) {
	return (
		<MainLayout title="Blog" description="insane posts about everything">
			{page}
		</MainLayout>
	)
};