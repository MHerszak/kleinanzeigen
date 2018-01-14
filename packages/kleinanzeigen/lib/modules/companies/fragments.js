import { registerFragment } from 'meteor/vulcan:core';
// import { Places } from 'meteor/vulcan:places';

registerFragment(`
  fragment CompaniesList on Company {
    # companies
    _id
    name
    type
    url
    description
    placeId
    place {
      ...PlaceItem
    }
  }
`);

registerFragment(`
  fragment CompaniesPage on Company {
    ...CompaniesList
    description
  }
`);