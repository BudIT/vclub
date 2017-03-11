import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import { toggleModal, like, dislike } from 'vclub/redux/club/vote';

import thumbUpIcon from './ic_thumb_up_black_24px.svg';
import thumbDownIcon from './ic_thumb_down_black_24px.svg';
import thumbsUpDownIcon from './ic_thumbs_up_down_black_24px.svg';

import styles from './QuickVoteButton.css';
import buttonStyles from '../Button.css';


export default composedComponent(
  'QuickVoteButton',

  connect(state => ({
    me: state.auth.user,
    ...state.vote,
  })),

  withHandlers({
    onToggleClick: (props) => () => {
      props.dispatch(toggleModal());
    },
    onProsClick: (props) => () => {
      const { dispatch, me } = props;

      dispatch(like(me.id));
    },
    onConsClick: (props) => () => {
      const { dispatch, me } = props;

      dispatch(dislike(me.id));
    },
  }),

  onOutsideClick((props) => {
    if (props.showModalVote) {
      props.dispatch(toggleModal());
    }
  }),

  (props) => {
    const {
      showModalVote, pros, cons,
      onToggleClick, onProsClick, onConsClick,
    } = props;

    const modalIsOpen = showModalVote === true;
    const buttonStyle = modalIsOpen ? 'active' : 'button';

    return (
      <div styleName="buttonStyles.container">
        <button
          styleName={`buttonStyles.${buttonStyle}`}
          onClick={onToggleClick}
        >
          <SvgIcon glyph={thumbsUpDownIcon} />
        </button>
        {showModalVote && (
          <section styleName="styles.popup">
            <h2 styleName="styles.header">Опрос</h2>
            <div styleName="styles.body">
              <div styleName="styles.case">
                <button styleName="styles.button" onClick={onProsClick}>
                  <SvgIcon glyph={thumbUpIcon} size={32} />
                </button>
                <span>{pros.length}</span>
              </div>
              <div styleName="styles.case">
                <button styleName="styles.button" onClick={onConsClick}>
                  <SvgIcon glyph={thumbDownIcon} size={32} />
                </button>
                <span>{cons.length}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
);
