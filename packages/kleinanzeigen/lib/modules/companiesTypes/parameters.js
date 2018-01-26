/*

Categories parameter

*/
import gql from 'graphql-tag';

import { addCallback, getSetting, registerSetting } from 'meteor/vulcan:core';

import { CompaniesTypes } from './collection.js';

registerSetting('forum.companiesTypesFilter', 'union', 'Display posts belonging to all (“intersection”) or at least one of (“union”) the selected categories');

// Category Posts Parameters
// Add a 'categories' property to terms which can be used to filter *all* existing Posts views.
function CompaniesTypesParameter(parameters, terms, apolloClient) {

  // get category slugs
  const cat = terms.cat || terms['cat[]'];
  const companiesTypesSlugs = Array.isArray(cat) ? cat : [cat];
  let allCompaniesTypes = [];

  if (cat && cat.length) {

    // get all categories
    // note: specify all arguments, see https://github.com/apollographql/apollo-client/issues/2051
    const query = `
      query GetCompaniesTypes($terms: JSON) {
        CompaniesTypesList(terms: $terms) {
          _id
          slug
        }
      }
    `;

    if (Meteor.isClient) {
      // get categories from Redux store
      allCompaniesTypes = apolloClient.readQuery({
        query: gql`${query}`,
        variables: { terms: { limit: 0, itemsPerPage: 0 } }
      }).CompaniesTypesList;
    } else {
      // TODO: figure out how to make this async without messing up withList on the client
      // get categories through GraphQL API using runQuery
      // const results = await runQuery(query);
      // allCompaniesTypes = results.data.CategoriesList;
      allCompaniesTypes = CompaniesTypes.find().fetch();
    }
    // get corresponding category ids
    const companiesTypesIds = _.pluck(_.filter(allCompaniesTypes, companiesType => _.contains(companiesTypesSlugs, companiesType.slug)), '_id');
    const operator = getSetting('forum.companiesTypesFilter', 'union') === 'union' ? '$in' : '$all';

    parameters.selector = { ...parameters.selector, companiesTypes: { [operator]: companiesTypesIds } };
  }

  return parameters;
}

addCallback('companies.parameters', CompaniesTypesParameter);
