import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { auth } from 'vclub/redux/club/auth';
import VKLogin from 'vclub/components/api/vkAuth';
import AuthInputField from './AuthInputField';


import styles from './AuthPage.css';


const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Пожалуйста, введите Ваше имя !!!';
  } else if (values.username.length > 15) {
    errors.username = 'Имя должно быть 15 символов или меньше';
  }
  return errors;
};

const selector = formValueSelector('auth');

const enhance = compose(
  connect(state => ({
    master: selector(state, 'master'),
  })),
  setPropTypes({
    dispatch: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    onSubmit: (props) => (data) => {
      const { dispatch } = props;
      const { username, master, remember } = data;

      dispatch(auth({ name: username, master }, remember));
    },

    onVkLogin: (props) => (data) => {
      const { dispatch, master } = props;
      const id = `VK-${data.id}`;
      const name = `${data.first_name} ${data.last_name}`;
      const photo = data.photo_50;
      dispatch(auth({ name, photo, master, id }));
    },
  }),
  reduxForm({
    form: 'auth',
    initialValues: {
      username: '',
      master: false,
      remember: true,
    },
    validate,
  }),
);
export const AuthPageComponent = (props) => {
  const { handleSubmit, onVkLogin } = props;
  return (
    <div className={styles.authWrapper}>
      <div className={styles.centerContent}>
        <header className={styles.logo}>Virtual Club</header>
        <main className={styles.form}>
          <form className={styles.login} onSubmit={handleSubmit}>
            <fieldset className={styles.form_group}>
              <Field
                name="username"
                component={AuthInputField}
                type="text"
                placeholder="Имя..."
                className={styles.input_name}
                onFocus
              />
              <div className={styles.check_container}>
                <div className={styles.round_checkbox}>
                  <Field
                    name="master"
                    id="master"
                    component="input"
                    type="checkbox"
                  />
                  <label htmlFor="master">
                    <h3 className={styles.label_h3}>Ведущий</h3>
                  </label>
                </div>
                <div className={styles.round_checkbox}>
                  <Field
                    name="remember"
                    id="remember"
                    component="input"
                    type="checkbox"
                  />
                  <label htmlFor="remember">
                    <h3 className={styles.label_h3}>Запомнить</h3>
                  </label>
                </div>
              </div>
              <button
                className={styles.btnSubmit}
                type="submit"
              >
                Войти
              </button>
            </fieldset>
          </form>
          <div className={styles.social}>
            <VKLogin onLogin={onVkLogin} idApp={5820504} />
          </div>
        </main>
      </div>
    </div>
  );
};

AuthPageComponent.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onVkLogin: React.PropTypes.func.isRequired,
};

export default enhance(AuthPageComponent);
