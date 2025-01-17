import { registerFragment, extendFragment } from 'meteor/vulcan:core';

// note: fragment used by default on CategoriesList & PostsList fragments
registerFragment(`
  fragment CompaniesTypesMinimumInfo on CompaniesType {
    # vulcan:companiesTypes
    _id
    name
    slug
  }
`);
// CompaniesTypesList
registerFragment(`
  fragment CompaniesTypesList on CompaniesType {
    # vulcan:companiesTypes
    ...CompaniesTypesMinimumInfo
    order
    parentId
    parent {
      ...CompaniesTypesMinimumInfo
    }
  }
`);

extendFragment('CompaniesList', `
  companiesTypes {
    ...CompaniesTypesMinimumInfo
  }
`);