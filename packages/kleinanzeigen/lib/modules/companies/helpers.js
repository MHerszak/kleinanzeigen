import { Companies } from './collection.js';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Get URL of a company page.
 * @param {Object} Listin
 */
Companies.getPageUrl = (company, isAbsolute = false) => {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/companies/${company._id}`;
};

/**
 * @summary Return a post's link if it has one, else return its post page URL
 * @param {Object} post
 */
Companies.getLink = (company, isAbsolute = false, isRedirected = true) => {
  const url = isRedirected ? Utils.getOutgoingUrl(company.url) : company.url;
  return !!company.url ? url : Companies.getPageUrl(company, isAbsolute);
};

/**
 * @summary Whether a company's link should open in a new tab or not
 * @param {Object} company
 */
Companies.getLinkTarget = (company) => {
  return !!company.url ? '_blank' : '';
};
