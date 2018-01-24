/*

The CompaniesTypes collection

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for CompaniesTypes.
 * @namespace CompaniesTypes
 */
 export const CompaniesTypes = createCollection({

  collectionName: 'CompaniesTypes',

  typeName: 'CompaniesType',

  schema,

  resolvers: getDefaultResolvers('CompaniesTypes'),

  mutations: getDefaultMutations('CompaniesTypes'),

});