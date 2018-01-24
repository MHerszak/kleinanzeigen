/*

Custom fields on Posts collection

*/

import { Companies } from './../../modules';

import { getCompaniesAsOptions } from './schema.js';

// form: {
//   options: [
//     { label: 'Healthcare', value: 'healthcare' },
//     { label: 'Automobile', value: 'automobile' },
//     { label: 'Manufacturing', value: 'manufacturing' },
//     { label: 'Appliances', value: 'appliances' },
//     { label: 'Software', value: 'software' },
//     { label: 'Security', value: 'security' },
//     { label: 'Journalism', value: 'journalism' },
//     { label: 'Entertainment', value: 'entertainment' },
//     { label: 'Finance', value: 'finance' },
//     { label: 'Retail', value: 'retail' },
//   ]
// },

// import Tags from 'meteor/vulcan:forms-tags';

Companies.addField([
  {
    fieldName: 'companiesTypes',
    fieldSchema: {
      label: 'Domain',
      type: Array,
      control: 'checkboxgroup',
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      form: {
        noselect: true,
        type: 'bootstrap-category',
        order: 50,
        options: formProps => {
          return getCompaniesAsOptions(formProps.client);
        },
      },
      resolveAs: {
        fieldName: 'companiesTypes',
        type: '[CompaniesType]',
        resolver: async (document, args, { currentUser, Users, CompaniesTypes }) => {
          if (!document.companiesTypes) return [];
          const companiesTypes = _.compact(await CompaniesTypes.loader.loadMany(document.companiesTypes));
          return Users.restrictViewableFields(currentUser, CompaniesTypes, companiesTypes);
        }
      }
    }
  },
  {
    fieldName: 'companiesTypes.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);
