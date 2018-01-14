import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';

import schema from './schema.js';

export const Jobs = createCollection({
  collectionName: 'Jobs',

  typeName: 'Job',

  schema,

  resolvers: getDefaultResolvers('Jobs'),

  mutations: getDefaultMutations('Jobs'),
});
