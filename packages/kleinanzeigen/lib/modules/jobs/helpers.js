import { Jobs } from './collection.js';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Get URL of a company page.
 * @param {Object} Listin
 */
Jobs.getPageUrl = (company = {}, isAbsolute = false) => {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/jobs/${company._id}`;
};

/**
 * @summary Return a post's link if it has one, else return its post page URL
 * @param {Object} post
 */
Jobs.getLink = (company = {}, isAbsolute = false, isRedirected = true) => {
  const url = isRedirected ? Utils.getOutgoingUrl(company.url) : company.url;
  return !!company.url ? url : Jobs.getPageUrl(company, isAbsolute);
};

/**
 * @summary Whether a company's link should open in a new tab or not
 * @param {Object} company
 */
Jobs.getLinkTarget = (company = {}) => {
  return !!company.url ? '_blank' : '';
};
