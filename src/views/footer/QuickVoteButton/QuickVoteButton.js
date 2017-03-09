import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import setDisplayName from 'recompose/setDisplayName';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';

import { toggleModal } from 'vclub/redux/club/vote';

import likeIcon from './icon/like.png';
import dislikeIcon from './icon/dislike.png';

import styles from './QuickVoteButton.css';
import buttonStyles from '../Button.css';


const enhance = compose(
  setDisplayName('ResultQuickVoteOf'),
  connect(state => ({
    user: state.auth.user,
    ...state.vote,
  })),
  setPropTypes({
    dispatch: PropTypes.func,
    showModalVote: PropTypes.bool,
  }),
  withHandlers({
    onToggleClick: (props) => () => {
      const { dispatch } = props;
      dispatch(toggleModal());
    },
  }),
  onOutsideClick((props) => {
    if (props.showModalVote) {
      const { dispatch } = props;
      dispatch(toggleModal());
    }
  })
);


function ResultQuickVoteOf(props) {
  const {
    showModalVote,
    onToggleClick,
    pros,
    cons,
  } = props;

  const modalIsOpen = showModalVote === true;
  const buttonStyle = modalIsOpen ? 'active' : 'button';

  return (
    <div styleName="buttonStyles.container">
      <button
        styleName={`buttonStyles.${buttonStyle}`}
        onClick={onToggleClick}
      >
        &#63;
      </button>
      {showModalVote && (
        <section styleName="styles.popup">
          <h2>Опрос</h2>
          <div styleName="styles.popup_body">
            <div styleName="styles.case">
              <img src={likeIcon} alt="like" width={30} />
              <span>{pros.length}</span>
            </div>
            <div styleName="styles.case">
              <img src={dislikeIcon} alt="dislike" width={30} />
              <span>{cons.length}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

ResultQuickVoteOf.propTypes = {
  showModalVote: PropTypes.bool,
  onToggleClick: PropTypes.func,
  pros: PropTypes.arrayOf(PropTypes.string).isRequired,
  cons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default enhance(ResultQuickVoteOf);
