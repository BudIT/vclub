import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { passBall
  , setUserMenuPosition
  , toggleBallMenu
  , completesSession
} from 'vclub/redux/club/sharing';

import styles from './Member.css';

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
      const { user
        , member
        , ballPosition
        , showUserMenu
        , dispatch
      } = props;

      if (ballPosition === member.id) {
        return;
      }
      if (user.master || user.id === ballPosition) {
        dispatch(setUserMenuPosition(showUserMenu ? null : member.id));
      }
    },

    onPassBallClick: (props) => () => {
      const { member, user, dispatch, ballPosition } = props;
      if (user.master || user.id === ballPosition) {
        dispatch(passBall(member.id));
      }
    },

    onBallClick: (props) => () => {
      const { dispatch, user } = props;
      if (user.master) {
        dispatch(toggleBallMenu(true));
      }
    },

    onCompletesSessionClick: (props) => () => {
      const { dispatch } = props;
      dispatch(completesSession());
    },
  }),
);

function Member(props) {
  const { member
    , ballPosition
    , done
    , showUserMenu
    , showBallMenu
    , onPassBallClick
    , onBallClick
    , onMemberClick
    , onCompletesSessionClick
  } = props;

  const memberIsDone = done.includes(member.id);

  return (
    <div className={styles.memberContainer}>
      <button
        disabled={memberIsDone}
        onClick={onMemberClick}
        className={styles.membersBtn}
      >
        {member.name}
      </button>

      {showUserMenu && (
        <div className={styles.hideShowMenu}>
          <button
            className={styles.hideShowBtn}
            onClick={onPassBallClick}
          >
            Передать мяч
          </button>
        </div>
      )}
      {ballPosition === member.id && (
        <div className={styles.ballMenu}>
          <button
            className={styles.btnBall}
            onClick={onBallClick}
          >
            &#9918;
          </button>

          {showBallMenu && (
            <div className={styles.hideShowMenu}>
              <button
                className={styles.hideShowBtn}
                onClick={onCompletesSessionClick}
              >
                Завершить сеанс
              </button>
            </div>
          )}
        </div>
      )}

      {memberIsDone && (
        <button className={styles.btnDone}>&#10003;</button>
      )}
    </div>
  );
}

Member.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  ballPosition: PropTypes.string,
  done: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMemberClick: PropTypes.func,
  onPassBallClick: PropTypes.func,
  onBallClick: PropTypes.func,
  showUserMenu: PropTypes.bool,
  showBallMenu: PropTypes.bool,
  onCompletesSessionClick: PropTypes.func,
};

export default enhance(Member);