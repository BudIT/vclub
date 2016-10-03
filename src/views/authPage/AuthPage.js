import React, { Component } from 'react';
import { Control, Form, Field, actions } from 'react-redux-form';

// import styles from 'AuthPage.css';


class AuthPage extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(actions.submit('login'));
  }

  render() {
    return (
      <Form model="login" onSubmit={(e) => this.handleSubmit(e)}>

        <div className="form_group">
          <label htmlFor="name">Имя:</label>
          <Control.text model=".name" id="name" required />
        </div>

        <Field className="form_group">
          <label htmlFor="master">
            <Control.checkbox model=".master" id="master" />
            Ведущий
          </label>

          <label htmlFor="remember">
            <Control.checkbox model=".remember" id="remember" />
            Запомнить
          </label>
        </Field>

        <button type="submit">Войти</button>
      </Form>
    );
  }
}

export default AuthPage;

