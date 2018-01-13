import Users from 'meteor/vulcan:users';
import { addCallback, registerSetting } from 'meteor/vulcan:core';
import { createNotification } from './../email/notifications.js';
// import { Posts, Comments } from '../../modules';

registerSetting('notifications.signup', true, 'Send notifications after user has signed up');

function usersNewAdminUserCreationNotification (user) {
  // send notifications to admins
  const admins = Users.adminUsers();
  admins.forEach((admin) => {
    if (Users.getSetting(admin, "notifications_users", false)) {
      const emailProperties = Users.getNotificationProperties(user);
      createNotification(admin._id, 'newUser', emailProperties);
    }
  });
  return user;
}
addCallback('users.new.async', usersNewAdminUserCreationNotification);
