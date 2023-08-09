import React from 'react';
import iconDelete from '../images/element_delete-pic.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  //Подписка на контекст currentUser
  const user = React.useContext(CurrentUserContext);

  //Проверка своей карточки для отображения корзины
  const isOwn = props.card.owner === user.currentUser._id;

  const isLiked = props.card.likes.find(item => item === user.currentUser._id);

  const cardLikeButtonClassName = `element__heart ${isLiked ? 'element__heart_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <article key={props.card._id} className="element" data-card-id={props.card._id}>
      <img
        onClick={handleClick}
        className="element__pic"
        src={props.card.link}
        alt={props.card.name}
      />
      {isOwn && (
        <button
          style={{ backgroundImage: `url(${iconDelete})` }}
          className="element__delete-btn"
          aria-label="Delete"
          type="button"
          onClick={() => props.onTrashBtnClick(props.card)}
        ></button>
      )}
      <div className="element__title-area">
        <h2 className="element__title">{props.card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          aria-label="Like"
          type="button"
          onClick={handleLikeClick}
        >
          <p className="element__counter" aria-label="Like-counter">
            {props.card.likes.length}
          </p>
        </button>
      </div>
    </article>
  );
}

export default Card;
