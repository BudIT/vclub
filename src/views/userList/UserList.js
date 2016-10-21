import React, { PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';
import style from './UserList.css';

function UserList(props) {
  const {
    members,
  } = props;

  const sortedMembers = members.sort((a, b) => {
    if (a.master < b.master) {
      return 1;
    }
    if (a.master > b.master) {
      return -1;
    }
    return 0;
  });

  return (
    <Transition
      className={style.menu}
      component="div"
      enter={{
        opacity: 1,
      }}
      leave={{
        height: 0,
        opacity: 0,
      }}
    >
      {sortedMembers.map(member => (
        <span key={member.id}>
          <span className={style.icon}>
            <i className={style.user}>{member.name.charAt(0)}</i>
          </span>
          {member.name}
        </span>
        ))}
    </Transition>
  );
}

UserList.propTypes = {
  members: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default UserList;
