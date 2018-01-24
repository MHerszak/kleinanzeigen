/*

CompaniesTypes schema

*/

import { Utils } from 'meteor/vulcan:core';
// import { Utils } from 'meteor/vulcan:debug';
import { CompaniesTypes } from './collection.js';

export function getCompaniesTypes (apolloClient) {
  // get the current data of the store
  const apolloData = apolloClient.store.getState().apollo.data;
  // console.log('apolloData => ', apolloData);
  // filter these data based on their typename: we are interested in the categories data
  let categories = _.filter(apolloData, (object, key) => {
    // console.log(`object[${key}] => ${object.__typename}`);
    return object.__typename === 'CompaniesType'
  });
  // order categories
  categories = _.sortBy(categories, cat => cat.order);
  
  return categories;
}

export function getCompaniesAsOptions (apolloClient) {
  // give the form component (here: checkboxgroup) exploitable data
  return getCompaniesTypes(apolloClient).map((companiesType) => {
    return {
      value: companiesType._id,
      label: companiesType.name,
      // slug: companiesType.slug, // note: it may be used to look up from prefilled props
    };
  });
}

export function getCompaniesAsNestedOptions (apolloClient) {
  // give the form component (here: checkboxgroup) exploitable data
  const formattedCategories = getCompaniesTypes(apolloClient).map((companiesType) => {
    return {
      value: companiesType._id,
      label: companiesType.name,
      parentId: companiesType.parentId,
      _id: companiesType._id
      // slug: companiesType.slug, // note: it may be used to look up from prefilled props
    };
  });
  const nestedCategories = Utils.unflatten(formattedCategories, { idProperty: '_id', parentIdProperty: 'parentId', childrenProperty: 'options' });
  return nestedCategories;
}

// companiesType schema
const schema = {
  _id: {
    type: String,
    viewableBy: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  description: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    form: {
      rows: 3
    }
  },
  order: {
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onInsert: companiesType => {
      // if no slug has been provided, generate one
      const slug = companiesType.slug || Utils.slugify(companiesType.name);
      return Utils.getUnusedSlug(CompaniesTypes, slug);
    },
    onEdit: (modifier, companiesType) => {
      // if slug is changing
      if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== companiesType.slug) {
        const slug = modifier.$set.slug;
        return Utils.getUnusedSlug(CompaniesTypes, slug);
      }
    }
  },
  image: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  parentId: {
    type: String,
    optional: true,
    control: "select",
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    resolveAs: {
      fieldName: 'parent',
      type: 'CompaniesType',
      resolver: async (companiesType, args, {currentUser, Users, CompaniesTypes}) => {
        if (!companiesType.parentId) return null;
        const parent = await CompaniesTypes.loader.load(companiesType.parentId);
        return Users.restrictViewableFields(currentUser, CompaniesTypes, parent);
      },
      addOriginalField: true
    },
    form: {
      options: formProps => getCompaniesAsOptions(formProps.client)
    }
  }
};

export default schema;
