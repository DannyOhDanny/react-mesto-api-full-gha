import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function AddPlacePopup(props) {
  const {
    handleSubmit,
    register,
    //watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',

    defaultValues: {
      picname: '',
      url: 'https://'
    }
  });

  // console.log(watch('picname', 'url'));

  const onSubmit = data => {
    props.onAddPlace({
      name: data.picname,
      link: data.url
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      id={'add-popup'}
      btnName={'Создать'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={props.isLoading}
    >
      <input
        name="picname"
        placeholder="Название"
        type="text"
        className="popup__input popup__input_type_heading"
        id="place-input"
        {...register('picname', {
          required: { value: true, message: 'Обязательное поле' },
          pattern: {
            value: /^[а-яА-ЯёЁa-zA-Z0-9-;._\s]+$/,
            message: 'Неверно указано '
          },
          maxLength: {
            value: 30,
            message: 'Максимальное количество символов: 40'
          },
          minLength: {
            value: 2,
            message: 'Минимальное количество символов: 2'
          }
        })}
      />
      {errors.picname && (
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
            minHeight: '18px',
            color: '#ff0000',
            border: 'none'
          }}
        >
          {errors.picname.message}
        </span>
      )}

      <span className="popup__error place-input-error"></span>
      <input
        name="url"
        placeholder="Ссылка на картинку"
        type="url"
        className="popup__input popup__input_type_url"
        id="url-input"
        {...register('url', {
          required: { value: true, message: 'Обязательное поле' },
          pattern: {
            value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
            message: 'Неверно введен URL-адрес'
          },

          minLength: {
            value: 3,
            message: 'Минимальное количество символов: 3'
          }
        })}
      />
      {errors.url && (
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
            minHeight: '18px',
            color: '#ff0000',
            border: 'none'
          }}
        >
          {errors.url.message}
        </span>
      )}
      <span className="popup__error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
