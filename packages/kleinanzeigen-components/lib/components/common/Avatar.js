import { registerComponent } from 'meteor/vulcan:lib';

import React from 'react';

import PropTypes from 'prop-types';

import Users from 'meteor/vulcan:users';

import { Link } from 'react-router';

import classNames from 'classnames';

import Avatar from 'react-avatar';

function truncateName (name) {
  if (!name) return '';
  return name.substr(0, 2)
}

function getEmailName (email) {
  if (!email) return '';
  return email.substr(0, email.indexOf('@'))
}

function UserAvatar ({ src, name, email, size }) {
  return (
    <Avatar
      round
      size={size}
      src={src}
      value={truncateName(name || getEmailName(email))}
      textSizeRatio={2.5}
    />
  )
}

const UserAvatarComponent = ({ className, user, link, size }) => {

  const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);

  const img = <UserAvatar size={size} src={avatarUrl} email={Users.getEmail(user)} />;
  // const img = <img alt={Users.getDisplayName(user)} className="avatar-image" src={avatarUrl} title={user.username}/>;
  const initials = <span className="avatar-initials"><span>{Users.avatar.getInitials(user)}</span></span>;

  const avatar = avatarUrl ? img : initials;

  return (
    <div className={classNames('avatar', className)}>
      {link ?
        <Link to={Users.getProfileUrl(user)}>
          <span>{avatar}</span>
        </Link>
        : <span>{avatar}</span>
      }
    </div>
  );

};

UserAvatarComponent.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.number,
  link: PropTypes.bool
};

UserAvatarComponent.defaultProps = {
  size: 20,
  link: true
};

UserAvatarComponent.displayName = 'UserAvatarComponent';

registerComponent('Avatar', UserAvatarComponent);
// registerComponent('UsersAvatar', UserAvatarComponent);
