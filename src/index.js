import './css/style.css';
import './css/comment.css';
import getData, { addLikes, likeCount } from './js/api';
import createCardItem from './js/createCardItem';
import displayTvShownumbers from './js/itemsCounter';
import enableComments from './js/CommentPopup';

document.addEventListener('click', async (e) => {
  if (e.target.matches('.heart')) {
    e.target.classList.toggle('is-active');
    const id = Number(e.target.id);
    const like = Number(e.target.nextSibling.textContent.match(/[0-9]/g).join(''));
    e.target.nextSibling.textContent = `${like + 1} likes`;
    await addLikes(id);
  }
});

const loading = () => {
  const cardsContainer = document.querySelector('.grid-cards-container');
  const loadDiv = document.createElement('div');
  const mask = document.createElement('div');
  loadDiv.classList.add('loading');
  mask.classList.add('mask');
  cardsContainer.append(mask, loadDiv);
};

const removeLoding = () => {
  document.querySelector('.loading').remove();
  document.querySelector('.mask').remove();
};

const renderItems = async () => {
  loading();
  const itemsData = await getData();
  displayTvShownumbers(itemsData);
  removeLoding();
  const likes = await likeCount();
  for (let i = 0; i < itemsData.length; i += 1) {
    let numLikes = 0;
    numLikes = likes.filter((like) => like.item_id === itemsData[i].id);
    if (numLikes.length > 0) {
      createCardItem(itemsData[i], numLikes[0].likes);
    } else {
      createCardItem(itemsData[i], 0);
    }
  }
};

renderItems().then(() => {
  enableComments();
});
