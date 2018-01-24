import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment PlaceItem on Place {
    # places
    _id
    name
  }
`);
