import React, { PropTypes } from 'react';

import style from './UserList.css';

function UserList(props) {
  const {
    numberOfMembers,
    members,
    toggleMemberPanel,
    dispatch,
  } = props;

  return (
    <ul className={style.ul}>
      <li className={style.li}>1</li>
      <li className={style.li}>2</li>
    </ul>
  );
}

UserList.propTypes = {
  numberOfMembers: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  toggleMemberPanel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  numberOfMembers: 1,
};

export default UserList;

