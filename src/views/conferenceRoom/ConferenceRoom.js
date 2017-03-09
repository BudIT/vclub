import R from 'ramda';
import React from 'react';
import { createSelector } from 'reselect';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import Stream from 'vclub/components/Stream/Stream';
import UserAvatar from 'vclub/components/userAvatar/UserAvatar';

import './ConferenceRoom.css';


const memberRowsSelector = createSelector(
  state => state.members.online,
  members => {
    const colCount = Math.ceil(Math.sqrt(members.length));
    const cols = R.splitEvery(colCount, members);

    return cols.length > 1 ? R.transpose(cols) : cols;
  },
);

export default composedComponent(
  'ConferenceRoom',

  connect(state => ({
    me: state.auth.user,
    videoStreams: state.rtc.videoStreams,
    videoMedia: state.videoMedia,
    memberRows: memberRowsSelector(state),
  })),

  withHandlers({
    renderContent: (props) => (member) => {
      const { videoStreams, videoMedia, me } = props;
      const stream = me.id === member.id ? videoMedia.stream : videoStreams[member.id];

      if (stream) {
        return <Stream type="video" from={stream} styleName="video" />;
      }

      return (
        <div styleName="avabox">
          <UserAvatar user={member} />
          <div styleName="name">{member.name}</div>
        </div>
      );
    },
  }),

  ({ memberRows, renderContent }) => {
    const height = memberRows.length;
    const width = memberRows[0].length;

    return (
      <section styleName="container">
        {memberRows.map((row, index) => (
          <div styleName={`rowOf${height}`} key={index}>
            {row.map(member => (
              <div styleName={`cellOf${width}`} key={member.id}>
                {renderContent(member)}
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  }
);
