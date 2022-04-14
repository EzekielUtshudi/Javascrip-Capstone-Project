const url1 = 'https://api.tvmaze.com/shows';
const url2 = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VWIl4IKk3y3x1neav2bU/likes';

const fetchData = (url, CostumSettings = {}) => {
  const response = fetch(url, CostumSettings)
    .then((res) => res.json());
  return response;
};

const getData = () => fetchData(url1);

export const likeCount = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VWIl4IKk3y3x1neav2bU/likes');
  const data = await response.json();
  return data;
};

export const addLikes = async (id) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  };
  const res = await fetchData(url2, settings)
    .catch((err) => err);
  return res;
};

export default getData;