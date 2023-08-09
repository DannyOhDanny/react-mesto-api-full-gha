import React from 'react';
//import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function EditAvatarPopup(props) {
  //Объявление хука useForm
  const {
    handleSubmit,
    register,
    // watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',

    defaultValues: {
      avatarlink: 'https://'
    }
  });

  //console.log(watch('avatarlink'));

  //Неуправляемый импут
  // const avatarRef = useRef('');

  //обработчик сабмита формы
  function onSubmit(data) {
    /* Значение инпута, полученное с помощью рефа */
    props.onUpdateAvatar({
      avatar: data.avatarlink
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Обновить аватар"
      id={'avatar-popup'}
      btnName={'Сохранить'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={props.isLoading}
    >
      <input
        //ref={avatarRef}
        className="popup__input popup__input_type_url"
        id="avatar-input"
        name="avatarlink"
        placeholder="Ссылка на аватар"
        type="url"
        {...register('avatarlink', {
          required: { value: true, message: 'Обязательное поле' },
          pattern: {
            value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
            message: 'Неверно указан URL-адрес аватара'
          },
          minLength: {
            value: 5,
            message: 'Минимальное количество символов: 5'
          }
        })}
      />
      {errors.avatarlink && (
        <span
          style={{
            margin: '0',
            padding: '0 36px 0 36px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '1.25',
            minHeight: '36px',
            color: '#ff0000',
            border: 'none'
          }}
        >
          {errors.avatarlink.message}
        </span>
      )}
      <p></p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
