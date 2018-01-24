import { Companies } from '../companies/index.js';
import { CompaniesTypes } from './collection.js';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Get all of a category's parents
 * @param {Object} companiesType
 */
CompaniesTypes.getParents = (companiesType, store) => {
  const companiesTypesArray = [];
  const getParents = function recurse(companiesType) {
    if (companiesType && companiesType.parentId) {
      const parent = store ? CompaniesTypes.findOneInStore(store, companiesType.parentId) : CompaniesTypes.findOne(companiesType.parentId);
      if (parent) {
        companiesTypesArray.push(parent);
        recurse(parent);
      }
    }
  };
  getParents(companiesType);

  return companiesTypesArray;
};

/**
 * @summary Get all of a category's children
 * @param {Object} category
 */
CompaniesTypes.getChildren = (company) => {
  let companiesTypesArray = [];

  const getChildren = function recurse(companiesTypes) {
    const children = CompaniesTypes.find({ parentId: { $in: _.pluck(companiesTypes, '_id') } }).fetch()
    if (children.length > 0) {
      companiesTypesArray = companiesTypesArray.concat(children);
      recurse(children);
    }
  };
  getChildren([company]);

  return companiesTypesArray;
};
/**
 * @summary Get all of a company's companiesTypes
 * @param {Object} company
 */
Companies.getCategories = (company) => {
  return !!company.companiesTypes ? Companies.find({ _id: { $in: company.companiesTypes }}).fetch() : [];
};
/**
 * @summary Get a category's URL
 * @param {Object} companiesType
 */
CompaniesTypes.getUrl = (companiesType, isAbsolute) => {
  isAbsolute = typeof isAbsolute === 'undefined' ? false : isAbsolute; // default to false
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/?cat=${companiesType.slug}`;
};
/**
 * @summary Get a companies's counter name
 * @param {Object} companiesType
 */
CompaniesTypes.getCounterName = (companiesType) => {
  return companiesType._id + '-companiesCount';
}

