/*

Seed database (not currently used)

*/

import { Meteor } from 'meteor/meteor';
import { getSetting } from 'meteor/vulcan:core';

// import Users from 'meteor/vulcan:users';
// import { newMutation } from 'meteor/vulcan:core';

// const seedData = [];

Meteor.startup(() => {
  if (getSetting('mail.user')) {
    console.log('Init MAIL_URL');
    const smtp = {
      username: getSetting('mail.user'),
      password: getSetting('mail.pw'),
      server:   getSetting('mail.server'),
      port: getSetting('mail.port')
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  }
});
