const postsContainer = document.getElementById('posts');
const API_URL = 'https://dummyjson.com/posts?limit=5';

// Helper function for timeout (in case API hangs)
const fetchWithTimeout = (url, options = {}, timeout = 8000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};

const fetchPosts = async () => {
  postsContainer.innerHTML = `<p>Loading data...</p>`;

  try {
    const response = await fetchWithTimeout(API_URL);

    // Check if response is OK (status code 200–299)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Validate structure
    if (!data || !Array.isArray(data.posts)) {
      throw new Error('Invalid data format received from API.');
    }

    const posts = data.posts;

    // Handle empty data
    if (posts.length === 0) {
      postsContainer.innerHTML = `<p>No posts found.</p>`;
      return;
    }

    // Render posts
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
    console.error('Fetch Error:', error);
    postsContainer.innerHTML = `<p style="color:red;">❌ Error: ${error.message}</p>`;
  }
};

// Fetch posts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);