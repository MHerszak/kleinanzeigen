import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment PlaceItem on Place {
    # companies
    _id
    name
  }
`);
