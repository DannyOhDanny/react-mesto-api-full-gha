import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  //Подписка на контекст currentUser
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__columns">
          <div className="profile__column-avatar-btn" onClick={props.onEditAvatar}>
            <img className="profile__column-pic" src={user.currentUser.avatar} alt="Фото профиля" />
          </div>
          <div className="profile__column-bio">
            <div className="profile__row">
              <h1 className="profile__name">{user.currentUser.name}</h1>
              <button
                className="profile__button-edit profile__button-edit_action_edit"
                type="button"
                aria-label="Edit"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__position">{user.currentUser.about}</p>
          </div>
          <button
            onClick={props.onAddPlace}
            className="profile__button-add profile__button-add_action_add"
            type="button"
            aria-label="Add"
          ></button>
        </div>
      </section>
      <section className="elements" aria-label="Карточки мест">
        {props.cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onTrashBtnClick={props.onTrashBtnClick}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
