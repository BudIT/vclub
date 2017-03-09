import React, { PropTypes } from 'react';

import './UserAvatar.css';


const Colors = [
  '#5A8770', '#B2B7BB', '#6FA9AB', '#F5AF29', '#0088B9', '#F18636', '#D93A37', '#A6B12E', '#5C9BBC',
  '#F5888D', '#9A89B5', '#407887', '#9A89B5', '#5A8770', '#D33F33', '#A2B01F', '#F0B126', '#0087BF',
  '#F18636', '#0087BF', '#B2B7BB', '#72ACAE', '#9C8AB4', '#5A8770', '#EEB424', '#407887',
];

function getHash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i); // eslint-disable-line
  }

  return hash >>> 0; // eslint-disable-line
}

function getColor(userId) {
  return Colors[getHash(userId) % Colors.length];
}

function UserAvatar(props) {
  const { user } = props;

  return (
    <span styleName="avatar">
      {user.photo
        ? <img src={user.photo} styleName="image" alt="avatar" />
        : (
          <i styleName="letter" style={{ backgroundColor: getColor(user.id) }}>
            {user.name.charAt(0).toUpperCase()}
          </i>
        )
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
