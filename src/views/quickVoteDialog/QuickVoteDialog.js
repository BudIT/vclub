import React from 'react';
import Modal from 'react-modal';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import { like, dislike } from 'vclub/redux/club/vote';

import thumbUpIcon from './ic_thumb_up_black_24px.svg';
import thumbDownIcon from './ic_thumb_down_black_24px.svg';

import './QuickVoteDialog.css';


export default composedComponent(
  'QuickVoteDialog',

  connect(state => ({
    me: state.auth.user,
    ...state.vote,
  })),

  withHandlers({
    onLikeClick: (props) => () => {
      const { dispatch, me } = props;
      dispatch(like(me.id));
    },
    onDislikeClick: (props) => () => {
      const { dispatch, me } = props;
      dispatch(dislike(me.id));
    },
  }),

  (props) => {
    const {
      showModalVote, me, pros, cons,
      onLikeClick, onDislikeClick,
    } = props;

    const userVotedPros = pros.includes(me.id);
    const userVotedCons = cons.includes(me.id);
    const userHasVoted = userVotedPros || userVotedCons;

    return (
      <Modal
        isOpen={!me.master && showModalVote && !userHasVoted}
        contentLabel="Modal"
        styleName="modal"
        style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 } }}
      >
        <section styleName="container">
          <h2 styleName="title">Опрос</h2>
          <div>
            <button styleName="button" onClick={onLikeClick}>
              <SvgIcon glyph={thumbUpIcon} size={40} />
            </button>
            <button styleName="button" onClick={onDislikeClick}>
              <SvgIcon glyph={thumbDownIcon} size={40} />
            </button>
          </div>
        </section>
      </Modal>
    );
  }
);
