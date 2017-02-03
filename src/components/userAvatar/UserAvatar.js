import React, { PropTypes } from 'react';

import style from './UserAvatar.css';


function UserAvatar(props) {
  const { members } = props;

  return (
    <span className={style.icon}>
      {members.photo
        ? <img src={members.photo} className={style.userAvatar} alt="avatar" />
        : (<span className={style.icon}>
          <i className={style.user}>{members.name.charAt(0).toUpperCase()}</i>
        </span>)
      }
    </span>
  );
}

UserAvatar.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
    photo: PropTypes.string,
  })).isRequired,
};

export default UserAvatar;
