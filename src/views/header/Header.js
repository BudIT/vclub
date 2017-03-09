import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';

import UserListButton from './userListButton/UserListButton';
import MenuButton from './menuButton/MenuButton';

import './Header.css';


export default composedComponent(
  'Header',

  () => (
    <div styleName="container">
      <span styleName="title">Демонстрационная встреча</span>
      <div styleName="panel">
        <UserListButton />
        <MenuButton />
      </div>
    </div>
  )
);
