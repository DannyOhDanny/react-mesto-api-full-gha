import React from 'react';
import iconClose from '../images/popup__button-close.svg';
import { useEffect } from 'react';

const ESC_CODE = 27;

function PopupWithForm({ isOpen, ...props }) {
  //Закрытие попапа по Esc
  useEffect(() => {
    function handleEscapeKey(event) {
      if (!isOpen) return;

      if (event.keyCode === ESC_CODE) {
        props.onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);

    return () => document.removeEventListener('keydown', handleEscapeKey);
    // eslint-disable-next-line
  }, [isOpen]);

  //Закрытие попапа по клику на overlay
  function handleClickonOverlay(e) {
    props.onClose();
  }

  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={props.id}
      onClick={e => {
        handleClickonOverlay(e);
      }}
    >
      <div className="popup__container" onClick={event => event.stopPropagation()}>
        <button
          style={{ backgroundImage: `url(${iconClose})` }}
          onClick={props.onClose}
          className="popup__button-close"
          type="button"
          aria-label="Close"
        ></button>
        <form
          className="popup__form"
          id="edit-form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__input-title">{props.title}</h2>
          {props.children}
          <button
            disabled={props.isLoading}
            className="popup__button"
            type="submit"
            aria-label="Save"
          >
            {props.isLoading ? 'Сохранение...' : props.btnName || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
