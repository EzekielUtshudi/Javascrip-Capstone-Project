const commentsEndpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/DWcDAh13W8mhMfudWgwK/comments';
const fetchMovieComments = async (movieId) => {
  const response = await fetch(`${commentsEndpoint}?item_id=${movieId}`).catch((err) => err);
  return response.json();
};

// async function to fetch total number of available comments for a movie wih a specific ID
const getTotalComments = async (movieId) => {
  const res = await fetchMovieComments(movieId)
    .then((data) => (!data.error ? data.length : 0))
    .catch(() => 0);
  return res;
};
const popup = document.querySelector('.movie-popup');

// Update UI total number of comments
const updateTotalCommentsCount = (movieId) => {
  getTotalComments(movieId).then((total) => {
    popup.querySelector('.total-comments').innerHTML = total;
  });
};
const commentCounter = (data) => (typeof (data) === 'object' ? data.length : 'invalid');

document.addEventListener('click', async (e) => {
  if (e.target.matches('.comment-btn')) {
    const data = await fetchMovieComments(e.target.id);
    const commentNumber = commentCounter(data);
    document.querySelector('.total-comments').textContent = commentNumber || 0;
  }
});

export default updateTotalCommentsCount;
export { fetchMovieComments, commentCounter };
