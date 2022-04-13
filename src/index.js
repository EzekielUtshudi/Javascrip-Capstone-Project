import './css/style.css';
import './css/comment.css';
import getData, { addLikes, getLikes } from './js/api';
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
  let index = 0;
  const itemsData = await getData();
  const likesData = await getLikes();
  displayTvShownumbers(itemsData);
  likesData.sort((a, b) => a.item_id - b.item_id);
  removeLoding();
  for (let i = 0; i < itemsData.length; i += 1) {
    if (likesData[index] !== undefined && itemsData[i].id === likesData[index].item_id) {
      createCardItem(itemsData[i], likesData[index]);
      index += 1;
    } else {
      createCardItem(itemsData[i]);
    }
  }
};

renderItems().then(() => {
  enableComments();
});