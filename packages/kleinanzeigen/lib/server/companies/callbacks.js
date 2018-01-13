import { addCallback } from 'meteor/vulcan:core';

// import { geocode } from 'meteor/vulcan:maps';

import { checkAndAddPlace, geocode } from 'meteor/vulcan:places';

import Users from 'meteor/vulcan:users';

// import { createNotification } from './../email/notifications.js';

import VulcanEmail from 'meteor/vulcan:email';

const geoFields = ['address', 'address2', 'state', 'city', 'zipCode', 'country'];

const getAddressString = document => _.compact(geoFields.map(field => document[field])).join(' ');
// const getAddressString = document => _.compact(geoFields.map(field => document[field])).join(' ');

/*
When a new company is created, geocode its address
*/
async function geocodeAddressOnNewRoom (document, currentUser) {
  console.log('geocodeAddressOnNewRoom', document);
  // if (_.some(geoFields, field => !!document[field])) {
  //
  // }
  try {
    const geoData = await geocode(getAddressString(document));
    console.log('geoData', document);
    document = {
      ...document,
      geoData,
      location: {
        type: 'Point',
        coordinates: {
          lng: geoData.geometry.location.lng,
          lat: geoData.geometry.location.lat
        },
        // coordinates: [geoData.geometry.location.lng, geoData.geometry.location.lat],
      }
    }
  } catch (error) {
    console.log('//geoData error')
    console.log(error)
  }
  return document;
}
addCallback('companies.new.sync', geocodeAddressOnNewRoom);

/**
 * Add a new place to a collection in case it is not in the collection.
 * @param document
 * @param user
 */
function postsNewCheckForNewPlace (document, user) {
  if (document.placeId) checkAndAddPlace(document.placeId);
}
addCallback('companies.new.async', postsNewCheckForNewPlace);


/*
When a company is edited, geocode its address
*/
async function geocodeAddressOnEditRoom (modifier, document, currentUser) {
  // if (_.some(geoFields, field => modifier.$set[field] && modifier.$set[field] !== document[field])) {
  //
  // }
  try {
    const geoData = await geocode(getAddressString(modifier.$set));
    modifier.$set = {
      ...modifier.$set,
      geoData,
      location: {
        type: 'Point',
        coordinates: {
          lng: geoData.geometry.location.lng,
          lat: geoData.geometry.location.lat
        },
        // coordinates: [geoData.geometry.location.lng, geoData.geometry.location.lat]
      }
    }
  } catch (error) {
    console.log('//geoData error')
    console.log(error)
  }
  return modifier;
}
addCallback('companies.edit.sync', geocodeAddressOnEditRoom);

/*
When a new company is created, send a notification to all admins
*/
async function CompaniesNewNotification (documents) {

  const adminUsers = Users.find({ isAdmin : true, _id: { $ne: documents.userId }}).fetch();
  const emails = _.compact(_.pluck(adminUsers, 'email'));

  console.log('emails to send to ', emails);

  await VulcanEmail.buildAndSend({
    to: emails,
    emailName: 'companiesNew',
    variables: { documentId: documents._id }
  });

}
addCallback('companies.new.async', CompaniesNewNotification);
