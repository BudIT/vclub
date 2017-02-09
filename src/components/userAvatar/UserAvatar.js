import React, { PropTypes } from 'react';

import style from './UserAvatar.css';


function UserAvatar(props) {
  const { user } = props;
  return (
    <span className={style.icon}>
      {user.photo
        ? <img src={user.photo} className={style.userAvatar} alt="avatar" />
        : (<span className={style.icon}>
          <i className={style.user}>{user.name.charAt(0).toUpperCase()}</i>
        </span>)
      }
    </span>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserAvatar;
