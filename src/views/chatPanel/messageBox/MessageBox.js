import React from 'react';
import cx from 'classnames';
import format from 'date-fns/format';

import ServerTime from 'vclub/utils/ServerTime';
import composedComponent from 'vclub/utils/composedComponent';

import UserAvatar from 'vclub/components/userAvatar/UserAvatar';
import StickyContainer from 'vclub/components/stickyContainer/StickyContainer';

import './MessageBox.css';


const ShadowUser = {
  id: '__shadow__',
  name: 'Кто-то',
};

export default composedComponent(
  'MessageBox',

  (props) => {
    const { messages, allMembers, me } = props;

    return (
      <StickyContainer styleName="container">
        {messages.map(message => {
          const user = allMembers[message.userId] || ShadowUser;
          const date = new Date(ServerTime.toLocal(message.date));
          const self = user.id === me.id;

          return (
            <div key={message.id} styleName={cx(self ? 'my-message-box' : 'message-box')}>
              <div styleName="pic-column">
                <UserAvatar user={user} />
              </div>
              <div styleName="content">
                <div styleName={cx(self ? 'my-info' : 'info')}>
                  <span styleName="name">{user.name}</span>
                  <span styleName="time">{format(date, 'HH:mm')}</span>
                </div>
                <div styleName="message">
                  {message.message}
                </div>
              </div>
            </div>
          );
        })}
      </StickyContainer>
    );
  }
);
