import React from 'react';
import uuid from 'uuid';
import { createSelector } from 'reselect';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import { auth } from 'vclub/redux/club/auth';
import VKLogin from 'vclub/components/api/vkAuth';
import AuthInputField from './AuthInputField';


import styles from './AuthPage.css';


const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Пожалуйста, введите Ваше имя !!!';
  }

  return errors;
};

const authFormSelector = formValueSelector('auth');

const initialValuesSelector = createSelector(
  state => state.auth.restored,
  restoredAuth => ({
    name: restoredAuth ? restoredAuth.name : '',
    master: restoredAuth ? restoredAuth.master : false,
  })
);

export default composedComponent(
  'AuthPage',

  connect(state => ({
    master: authFormSelector(state, 'master'),
    restoredAuth: state.auth.restored,
    initialValues: initialValuesSelector(state),
    vkAppId: state.config.vkAppId,
  })),

  withHandlers({
    onSubmit: (props) => (data) => {
      const { dispatch, restoredAuth } = props;
      const { name, master } = data;
      const renewId = !restoredAuth || name !== restoredAuth.name;
      const id = renewId ? uuid.v4() : restoredAuth.id;

      dispatch(auth({ id, name, master }));
    },

    onVkLogin: (props) => (data) => {
      const { dispatch, master } = props;
      const id = `VK-${data.id}`;
      const name = `${data.first_name} ${data.last_name}`;
      const photo = data.photo_50;
      dispatch(auth({ name, photo, master, id }, false));
    },
  }),

  reduxForm({
    form: 'auth',
    validate,
  }),

  ({ handleSubmit, vkAppId, onVkLogin }) => (
    <div className={styles.authWrapper}>
      <div className={styles.centerContent}>
        <header className={styles.logo}>Онлайн клуб</header>
        <main className={styles.form}>
          <form className={styles.login} onSubmit={handleSubmit}>
            <fieldset className={styles.form_group}>
              <Field
                name="name"
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
            <VKLogin onLogin={onVkLogin} idApp={vkAppId} />
          </div>
        </main>
      </div>
    </div>
  )
);
