import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';

import schema from './schema.js';

// import './fragments.js';
//
// import './permissions.js';
//
// import './parameters.js';

export const Companies = createCollection({
  collectionName: 'Companies',

  typeName: 'Company',

  schema,

  resolvers: getDefaultResolvers('Companies'),

  mutations: getDefaultMutations('Companies'),
});
