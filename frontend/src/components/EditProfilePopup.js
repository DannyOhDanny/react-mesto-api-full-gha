import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function EditProfilePopup(props) {
  const {
    handleSubmit,
    register,
    // watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',

    defaultValues: {
      name: '',
      position: ''
    }
  });

  // console.log(watch('name', 'position'));

  // Обработчик сабмита формы
  function onSubmit(data) {
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: data.name,
      about: data.position
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Редактировать профиль"
      id={'edit-popup'}
      btnName={'Сохранить'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={props.isLoading}
    >
      <input
        name="name"
        placeholder="Имя"
        type="text"
        className="popup__input popup__input_type_name"
        id="name-input"
        {...register('name', {
          required: { value: true, message: 'Обязательное поле' },
          pattern: {
            value: /^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$/,
            message: 'Неверно указано имя'
          },
          maxLength: {
            value: 40,
            message: 'Максимальное количество символов: 40'
          },
          minLength: {
            value: 2,
            message: 'Минимальное количество символов: 2'
          }
        })}
      />
      {errors.name && (
        <span
          style={{
            display: 'block',
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
          {errors.name.message}
        </span>
      )}
      <p></p>
      <input
        name="position"
        placeholder="О себе"
        type="text"
        className="popup__input popup__input_type_position"
        id="position-input"
        {...register('position', {
          required: { value: true, message: 'Обязательное поле' },
          pattern: {
            value: /^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$/,
            message: 'Неверно введены данные'
          },
          maxLength: {
            value: 100,
            message: 'Максимальное количество символов: 100'
          },
          minLength: {
            value: 2,
            message: 'Минимальное количество символов: 2'
          }
        })}
      />
      {errors.position && (
        <span
          style={{
            display: 'block',
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
          {errors.position.message}
        </span>
      )}
      <p></p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
