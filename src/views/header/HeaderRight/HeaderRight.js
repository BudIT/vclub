import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setDisplayName from 'recompose/setDisplayName';

// actions
import { logOut } from 'vclub/redux/club/auth';
import { toggleMemberPanel } from 'vclub/redux/club/ui';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import style from './HeaderRight.css';

import MediaButton from './MediaButton/MediaButton';
import ResultQuickVoteOf from './vote/ResultQuickVoteOf';

import usersIcon from './ic_group_black_24px.svg';


const enhance = compose(
  setDisplayName('HeaderRight'),
  withHandlers({
    onToggleMemberPanel: props => () => {
      props.dispatch(toggleMemberPanel());
    },
    onLogOut: props => () => {
      props.dispatch(logOut());
    },
  }),
);

export function HeaderRightComponent(props) {
  const {
    numberOfMembers,
    showMemberPanel,
    onLogOut,
    onToggleMemberPanel,
    user,
    dispatch,
  } = props;

  const displayVoteMenu = user.master;

  return (
    <ul className={style.ul}>
      <li>
        <MediaButton className={style.tab} />
      </li>
      {displayVoteMenu && (
        <li>
          <ResultQuickVoteOf
            className={style.tab}
            activeClassName={style.activeTab}
            dispatch={dispatch}
          />
        </li>
      )}
      <li>
        <button
          className={showMemberPanel ? style['tab--active'] : style.tab}
          onClick={onToggleMemberPanel}
        >
          <SvgIcon className={style.usersIcon} glyph={usersIcon} />
          {numberOfMembers}
        </button>
      </li>
      <li className={style.dropdown}>
        <button
          className={style.tab}
        >
          &#9776;
        </button>
        <div className={style.dropdownContent}>
          <button
            className={style.tab}
            onClick={onLogOut}
          >
            Выйти
          </button>
        </div>
      </li>
    </ul>
  );
}

HeaderRightComponent.propTypes = {
  numberOfMembers: PropTypes.number.isRequired,
  showMemberPanel: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onToggleMemberPanel: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default enhance(HeaderRightComponent);
