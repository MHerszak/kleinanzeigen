import React from 'react';

import { Companies } from './index';

import { PlaceControl } from 'meteor/vulcan:places';

Companies.addField([
  {
    fieldName: 'placeName',
    fieldSchema: {
      type: String,
      control: PlaceControl,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'placeId',
    fieldSchema: {
      type: String,
      hidden: true,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
    }
  },
]);