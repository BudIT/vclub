import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { passBall } from 'vclub/redux/club/sharing';

import styles from './Member.css';


const currentUser = (props) => () => {
  const {member, user} = props;

  if(user.master = true) {
    return <a href="" id={member.id}>Передать мяч</a>
  } else if (user.id === member.id) {

  }
  return user
};


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
    ballPosition: PropTypes.string,
  }),

  withHandlers({
    onMemberClick: (props) => () => {
      const {member, dispatch} = props;
      dispatch(passBall(member.id));
      currentUser
      console.log(currentUser)
    },
  }),
);

function Member(props) {

  const { member, ballPosition, done, onMemberClick } = props;

  const memberIsDone = done.includes(member.id);

  return (
    <div>
      <button
        disabled={memberIsDone}
        onClick={onMemberClick}
        className={styles.members_btn}
      >
        {member.name}
      </button>
      {ballPosition === member.id && (
        <button className={styles.btn_ball}>&#9918;</button>
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
  ballPosition: PropTypes.string,
  done: PropTypes.array.isRequired,
  onMemberClick: PropTypes.func.isRequired,
};

export default enhance(Member);
