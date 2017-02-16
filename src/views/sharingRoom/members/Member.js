import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import {
  passBall,
  setUserMenuPosition,
  toggleBallMenu,
  completesSession,
} from 'vclub/redux/club/sharing';

import SvgIcon from 'vclub/components/icons/SvgIcon';
import UserAvatar from 'vclub/components/userAvatar/UserAvatar';
import Popup from './popup/Popup';

import ballIcon from '../ball/icon/tennis-ball.svg';
import doneIcon from './icon/ic_done_black_24px.svg';

import style from './Member.css';

const enhance = compose(

  setPropTypes({
    dispatch: PropTypes.func,
    member: PropTypes.shape({
      id: PropTypes.string.isRequired,
      master: PropTypes.bool.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      master: PropTypes.bool.isRequired,
    }).isRequired,
    done: PropTypes.arrayOf(PropTypes.string).isRequired,
    ballPosition: PropTypes.string,
  }),

  withHandlers({
    onMemberClick: (props) => () => {
      const {
        user,
        member,
        ballPosition,
        showUserMenu,
        dispatch,
      } = props;

      if (ballPosition === member.id) {
        return;
      }
      if (user.master || user.id === ballPosition) {
        dispatch(setUserMenuPosition(showUserMenu ? null : member.id));
      }
    },

    onUserMenuHide: (props) => () => {
      props.dispatch(setUserMenuPosition(null));
    },

    onPassBallClick: (props) => () => {
      const { member, user, dispatch, ballPosition } = props;
      if (user.master || user.id === ballPosition) {
        dispatch(passBall(member.id));
      }
    },

    onBallClick: (props) => () => {
      const { dispatch, user, showBallMenu } = props;
      if (user.master) {
        dispatch(toggleBallMenu(!showBallMenu));
      }
    },

    onBallMenuHide: (props) => () => {
      props.dispatch(toggleBallMenu(false));
    },

    onCompletesSessionClick: (props) => () => {
      props.dispatch(completesSession());
    },
  }),
);

function Member(props) {
  const {
    member,
    ballPosition,
    done,
    showUserMenu,
    showBallMenu,
    onPassBallClick,
    onBallClick,
    onMemberClick,
    onCompletesSessionClick,
    onUserMenuHide,
    onBallMenuHide,
  } = props;

  const memberIsDone = done.includes(member.id);

  return (
    <div className={style.memberContainer}>
      <button
        disabled={memberIsDone}
        onClick={onMemberClick}
        className={style.membersBtn}
      >
        <span className={style.icon}>
          <UserAvatar user={member} />
        </span>
      </button>

      {showUserMenu && (
        <Popup title="Передать мяч" onClick={onPassBallClick} onOutsideClick={onUserMenuHide} />
      )}

      {ballPosition === member.id && (
        <div className={style.ballMenu}>
          <button
            className={style.btnBall}
            onClick={onBallClick}
          >
            <SvgIcon glyph={ballIcon} />
          </button>

          {showBallMenu && (
            <Popup
              title="Завершить сеанс"
              onClick={onCompletesSessionClick}
              onOutsideClick={onBallMenuHide}
            />
          )}
        </div>
      )}

      {memberIsDone && (
        <button className={style.btnDone}>
          <SvgIcon className={style.greenIcon} glyph={doneIcon} />
        </button>
      )}
    </div>
  );
}

Member.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
    photo: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  ballPosition: PropTypes.string,
  done: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMemberClick: PropTypes.func.isRequired,
  onPassBallClick: PropTypes.func.isRequired,
  onBallClick: PropTypes.func.isRequired,
  showUserMenu: PropTypes.bool.isRequired,
  showBallMenu: PropTypes.bool.isRequired,
  onCompletesSessionClick: PropTypes.func.isRequired,
  onUserMenuHide: PropTypes.func.isRequired,
  onBallMenuHide: PropTypes.func.isRequired,
};

export default enhance(Member);
