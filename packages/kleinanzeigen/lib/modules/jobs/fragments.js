import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment JobsList on Job {
    # jobs
    _id
    companyName
    name
    url
    type
    domain
    description
    createdAt
  }
`);
registerFragment(`
  fragment JobsPage on Job {
    # jobs
    ...JobsList
  }
`);
