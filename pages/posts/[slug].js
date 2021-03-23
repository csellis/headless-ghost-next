// pages/posts/[slug].js

import { getSinglePost, getPosts } from "../../lib/posts";
import styles from "../../styles/Home.module.css";

export async function getStaticPaths() {
  const posts = await getPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const post = await getSinglePost(context.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
}

const PostPage = ({ post }) => {
  return (
    <main className={styles.container}>
      <article className={styles.main}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
};

export default PostPage;
