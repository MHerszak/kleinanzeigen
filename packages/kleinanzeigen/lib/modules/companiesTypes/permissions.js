/*

CompaniesTypes permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'companiesTypes.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'companiesTypes.view'
];
Users.groups.members.can(membersActions);

const adminActions = [
  'companiesTypes.view',
  'companiesTypes.new',
  'companiesTypes.edit.all',
  'companiesTypes.remove.all'
];
Users.groups.admins.can(adminActions);
