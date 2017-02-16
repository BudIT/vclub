import R from 'ramda';
import React, { PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';
import { createSelector } from 'reselect';

import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';
import withDispatch from 'vclub/utils/hoc/withDispatch';

import { toggleMemberPanel } from 'vclub/redux/club/ui';
import UserAvatar from 'vclub/components/userAvatar/UserAvatar';

import style from './UserList.css';


function sortMembers(a, b) {
  return a.master < b.master ? 1 : -1;
}

const getSortedMembers = createSelector(
  props => props.members,
  members => R.sort(sortMembers, members)
);

const enhance = R.compose(
  withDispatch(),
  onOutsideClick((props) => {
    props.dispatch(toggleMemberPanel());
  }),
);

function UserList(props) {
  const sortedMembers = getSortedMembers(props);

  return (
    <Transition
      className={style.menu}
      component="div"
      enter={{
        opacity: 1,
        height: 35,
      }}
      leave={{
        height: 0,
        opacity: 0,
      }}
    >
      {sortedMembers.length === 0
        ? <span key={0}>No members</span>
        : sortedMembers.map(member => (
          <span key={member.id}>
            <span className={style.icon}>
              <UserAvatar user={member} />
            </span>
            {member.master === true
              ? <b className={style.master}>{member.name}</b>
              : member.name
            }
          </span>
        ))}
    </Transition>
  );
}

/*eslint-disable */
UserList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
    photo: PropTypes.string,
  })).isRequired,
};
/*eslint-enable */

export default enhance(UserList);
