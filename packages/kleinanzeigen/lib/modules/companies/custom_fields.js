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
  {
    fieldName: 'place',
    fieldSchema: {
      type: String,
      hidden: true,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      resolveAs: {
        fieldName: 'place',
        type: 'Place',
        resolver: async (place, args, context) => {
          const { currentUser, Places, Users } = context;
          if (!place.placeId) return {};
          const thisPlace = await Places.loader.load(place.placeId);
          // console.log('thisPlace => ', thisPlace);
          return Users.restrictViewableFields(currentUser, Places, thisPlace);
        }
      }
    }
  },
]);