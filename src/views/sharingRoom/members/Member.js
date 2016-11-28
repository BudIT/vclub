import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { passBall } from 'vclub/redux/club/sharing';
import { setUserMenuPosition } from 'vclub/redux/club/sharing';
import { toggleBallMenu } from 'vclub/redux/club/sharing';
import { completesSession } from 'vclub/redux/club/sharing';


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

      if(ballPosition === member.id) {
        return
      }
      if (user.master || user.id === ballPosition) {
        dispatch(setUserMenuPosition(showUserMenu ? null : member.id));
      }

    },

    onPassBallClick: (props) => () => {
      const { member, dispatch } = props;
        dispatch(passBall(member.id));
    },

    onBallClick: (props) => () => {
      const { dispatch } = props;
        dispatch(toggleBallMenu(true));

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
        className={styles.members_btn}
      >
        {member.name}
      </button>

      {showUserMenu  && (
        <div className={styles.hide_show_menu}>
          <button
            className={styles.hide_show_btn}
            onClick= {onPassBallClick}
          >
            Передать мяч
          </button>
        </div>
      )}
      {ballPosition === member.id && (
        <div className={styles.ballMenu}>
          <button
            className={styles.btn_ball}
            onClick={onBallClick}
          >
            &#9918;
          </button>

          {showBallMenu && (
            <div className={styles.hide_show_menu}>
              <button
                className={styles.hide_show_btn}
                onClick= {onCompletesSessionClick}
              >
                Завершить сеанс
              </button>
            </div>
          )}
        </div>
      )}

      {memberIsDone && (
        <button className={styles.btn_done}>&#10003;</button>
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
  onMemberClick: PropTypes.func.isRequired,
  onPassBallClick: PropTypes.func.isRequired,
};

export default enhance(Member);
