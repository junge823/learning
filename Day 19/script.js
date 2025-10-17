const postsContainer = document.getElementById('posts');
const API_URL = 'https://dummyjson.com/posts?limit=5';

const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // DummyJSON returns { posts: [ ... ] }
    const posts = data.posts;

    if (!Array.isArray(posts)) throw new Error('Posts data not in array format');

    postsContainer.innerHTML = posts
      .map(
        ({ id, title, body }) => `
        <article class="post">
          <h3>${id}. ${title}</h3>
          <p>${body}</p>
        </article>
      `
      )
      .join('');
  } catch (error) {
    postsContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
};

// Fetch posts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);