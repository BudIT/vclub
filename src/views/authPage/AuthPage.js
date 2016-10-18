import React, { Component } from 'react';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { auth, restoreAuth } from 'vclub/redux/club/auth';

import styles from './AuthPage.css';

const required = (val) => val && val.length;
const length = (val) => val.length <= 15;

class AuthPage extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  handleSubmit(login) {
    const { dispatch } = this.props;
    const action = auth({
      name: login.name,
      master: login.master,
    }, login.remember);
    dispatch(action);
  }

  render() {
    return (
      <section className={styles.auth}>
        <Form model="forms.login"
              onSubmit={(login) => this.handleSubmit(login)}
              className={styles.form}
        >
          <fieldset className={styles.form_group}>
            <div className={styles.input_lebel}>
              <label htmlFor="name" className={styles.input_lebel}>
                <h2>Имя</h2>
              </label>
              <Control.text model=".name"
                            id="name"
                            title="Пожалуйста, введите Ваше имя."
                            updateOn="blur"
                            validators={{ required, length }}
                            autoFocus
              />
              <Errors
                className={styles.errors}
                model=".name"
                show={{ touched: true, focus: false }}
                messages={{
                  required: '* Пожалуйста, введите Ваше имя !!!',
                  length: '* Длина имени не должна привышать 25 символов!!!',
                }}
              >
              </Errors>
            </div>

            <div className={styles.checkbox_group}>
              <div className={styles.round_checkbox}>
                <Control.checkbox model=".master"
                                  id="master"
                                  value="None"
                                  name="check"
                                  checked
                />
                <label htmlFor="master">
                  <h3>Ведущий</h3>
                </label>
              </div>
              <div className={styles.round_checkbox}>
                <Control.checkbox model=".remember"
                                  id="remember"
                                  value="None"
                                  name="check"
                                  checked
                />
                <label htmlFor="remember">
                  <h3>Запомнить</h3>
                </label>
              </div>
            </div>
            <button className={styles.btn} type="submit">Войти</button>
          </fieldset>
        </Form>
      </section>
    );
  }
}

export default AuthPage;
