import React, { PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';
import style from './UserList.css';

function UserList(props) {
  const {
    members,
  } = props;

  return (
    <div className={style.menu}>
      <Transition
        component="ul"
        enter={{
          height: 'auto',
          opacity: 1,
        }}
        leave={{
          height: 0,
          opacity: 0,
        }}
      >
        {members.map(member => (
          <div key={member.id}>
            <span className={style.icon}>
              <i className={style.user}>{member.name.charAt(0)}</i>
            </span>
            {member.name}
          </div>
        ))}
      </Transition>
    </div>
  );
}

UserList.propTypes = {
  members: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default UserList;
