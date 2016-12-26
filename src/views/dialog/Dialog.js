import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';

import { like, dislike } from 'vclub/redux/club/vote';

import Modal from 'react-modal';

import likeIcon from './icon/like.png';
import dislikeIcon from './icon/dislike.png';

import styles from './Dialog.css';


const enhance = compose(
  connect(state => ({
    user: state.auth.user,
    ...state.vote,
  })),
  setPropTypes({
    dispatch: PropTypes.func,
  }),
  withHandlers({
    onLikeClick: (props) => () => {
      const { dispatch, user } = props;
      dispatch(like(user.id));
    },
    onDislikeClick: (props) => () => {
      const { dispatch, user } = props;
      dispatch(dislike(user.id));
    },
  }),
);

function Dialog(props) {
  const {
    onLikeClick,
    onDislikeClick,
    showModalVote,
    user,
    pros,
    cons,
  } = props;

  const userVotedPros = pros.includes(user.id);
  const userVotedCons = cons.includes(user.id);
  const userHasVoted = userVotedPros || userVotedCons;


  return (
    <Modal
      isOpen={!user.master && showModalVote && !userHasVoted}
      contentLabel="Modal"
      className={styles.modalClass}
    >
      <section className={styles.containerModal}>
        <h2 className={styles.titleModal}>Опрос</h2>
        <div className={styles.modalBtn}>
          <button
            className={styles.likeBtn}
            onClick={onLikeClick}
          >
            <img src={likeIcon} alt="like button" width={40} />
          </button>
          <button
            className={styles.dislikeBtn}
            onClick={onDislikeClick}
          >
            <img src={dislikeIcon} alt="dislike button" width={40} />
          </button>
        </div>
      </section>
    </Modal>
  );
}

Dialog.propTypes = {
  onLikeClick: PropTypes.func.isRequired,
  onDislikeClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  showModalVote: PropTypes.bool.isRequired,
  pros: PropTypes.arrayOf(PropTypes.string).isRequired,
  cons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default enhance(Dialog);
