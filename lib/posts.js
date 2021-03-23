import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.BLOG_URL,
  key: process.env.API_KEY,
  version: "v3",
});

export async function getPosts() {
  let posts = await api.posts
    .browse({
      limit: "all",
      include: "tags",
    })
    .catch((err) => {
      console.error(err);
    });

  return posts;
}

export async function getSinglePost(postSlug) {
  console.log(postSlug);
  return await api.posts
    .read({
      slug: postSlug,
    })
    .catch((err) => {
      console.error(err);
    });
}
