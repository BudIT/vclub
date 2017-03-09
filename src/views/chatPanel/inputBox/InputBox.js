import React from 'react';
import { Field, reduxForm } from 'redux-form';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import sendIcon from './ic_send_black_24px.svg';
import './InputBox.css';


export default composedComponent(
  'ChatInputBox',

  connect(state => ({
    messages: state.chat.messages,
    username: state.auth.user.name,
  })),

  reduxForm({
    form: 'chatMessage',
    initialValues: {
      message: '',
    },
  }),

  ({ handleSubmit, pristine, submitting }) => (
    <form styleName="form" onSubmit={handleSubmit}>
      <div styleName="container">
        <div styleName="inputCell">
          <Field
            styleName="input"
            name="message"
            component="input"
            type="text"
            placeholder="Сообщение..."
            autoComplete="nope"
          />
        </div>
        <div>
          <button styleName="send" type="submit" disabled={submitting || pristine}>
            <SvgIcon glyph={sendIcon} />
          </button>
        </div>
      </div>
    </form>
  )
);
