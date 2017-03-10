import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';

import UserListButton from './userListButton/UserListButton';
import MenuButton from './menuButton/MenuButton';

import './Header.css';


export default composedComponent(
  'Header',

  connect(state => ({
    title: state.config.title,
  })),

  ({ title }) => (
    <div styleName="container">
      <span styleName="title">{title}</span>
      <div styleName="panel">
        <UserListButton />
        <MenuButton />
      </div>
    </div>
  )
);
