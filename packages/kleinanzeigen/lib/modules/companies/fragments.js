import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment CompaniesList on Company {
    # companies
    _id
    name
    type
    url
    description
    # users
  }
`);

registerFragment(`
  fragment CompaniesPage on Company {
    ...CompaniesList
    description
  }
`);