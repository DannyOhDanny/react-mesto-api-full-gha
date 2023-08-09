import React from 'react';
import iconClose from '../images/popup__button-close.svg';
import errorAuth from '../images/element_error-auth.svg';
import successAuth from '../images/element_correct-auth.svg';

function InfoTooltip(props) {
  //Ф-ия закрытия по клику на оверлей
  function handleClickOnOverlay(e) {
    props.onClose();
  }

  return (
    <div
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      id={props.id}
      onClick={e => {
        handleClickOnOverlay(e);
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
        <div className="auth-popup">
          <img
            className="auth-popup__image"
            alt="icon"
            src={props.isSuccess ? successAuth : errorAuth}
          />
          <p className="auth-popup__caption">{props.isSuccess ? props.onSuccess : props.onError}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
