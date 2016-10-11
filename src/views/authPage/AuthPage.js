import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { auth, restoreAuth } from 'vclub/redux/club/auth';

import styles from './AuthPage.css';


const AuthPage = (props) => {
  const handleSubmit = () => {
    const { dispatch } = props;
    const action = auth({
      name: name,
      master: master,
    }, remember);
    dispatch(action);
  };
  return (
    <section className={styles.auth}>
      <fieldset className={styles.form_group}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className={styles.input}>
              <div>
                <Field
                  name="name"
                  id="name"
                  component="input"
                  type="text"
                  placeholder="Имя..."
                />
              </div>
            </label>
          </div>
          <div className={styles.checkbox_group}>
            <div className={styles.round_checkbox}>
              <label htmlFor="master">
                <Field
                  name="master"
                  id="master"
                  component="input"
                  type="checkbox"
                />
                <h3>Ведущий</h3>
              </label>
            </div>
            <div className={styles.round_checkbox}>
              <label htmlFor="remember">
                <Field
                  name="remember"
                  id="remember"
                  component="input"
                  type="checkbox"
                />
                <h3>Запомнить</h3>
              </label>
            </div>
          </div>
          <button
            className={styles.btn}
            type="submit"
          >
            Войти
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default reduxForm({
  form: 'auth',
})(AuthPage);

