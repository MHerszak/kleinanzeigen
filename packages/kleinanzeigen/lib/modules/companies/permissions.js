import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  'companies.new',
  'companies.edit.own',
  'companies.remove.own',
]);