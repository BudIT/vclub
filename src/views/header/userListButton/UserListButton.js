import React from 'react';
import R from 'ramda';
import cx from 'classnames';
import { createSelector } from 'reselect';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';

import SvgIcon from 'vclub/components/icons/SvgIcon';
import UserAvatar from 'vclub/components/userAvatar/UserAvatar';

// import ListItem from './ListItem/ListItem';
import usersIcon from './ic_group_black_24px.svg';
import styles from './UserListButton.css';
// import buttonStyles from '../Button.css';


function sortMembers(a, b) {
  return a.master < b.master ? 1 : -1;
}

const getSortedMembers = createSelector(
  state => state.members.online,
  members => R.sort(sortMembers, members)
);

export default composedComponent(
  'UserListButton',

  connect(state => ({
    members: getSortedMembers(state),
  })),

  withState('opened', 'setOpened', false),

  onOutsideClick((props) => {
    if (props.opened) {
      props.setOpened(false);
    }
  }),

  withHandlers({
    onToggleClick: (props) => () => {
      props.setOpened(!props.opened);
    },
  }),

  (props) => {
    const {
      opened,
      members,
      onToggleClick,
    } = props;

    // const buttonStyle = opened ? 'active' : 'button';

    return (
      <div styleName="container">
        <button
          styleName="button"
          onClick={onToggleClick}
        >
          <SvgIcon glyph={usersIcon} />
          <span styleName="number">{members.length}</span>
        </button>
        {opened && (
          <ul styleName="popup">
            {members.map(member => (
              <li key={member.id} styleName={cx(member.master ? 'user-master' : 'user')}>
                <div styleName="avatar">
                  <UserAvatar user={member} />
                </div>
                <div styleName="name">
                  {member.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
