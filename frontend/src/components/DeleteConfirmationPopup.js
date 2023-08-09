import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmationPopup(props) {
  //Обработка сабмита с удалением карточки
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Вы уверены?"
      id={'delete-popup'}
      btnName={props.isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteConfirmationPopup;
