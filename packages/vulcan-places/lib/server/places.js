import googleMaps from '@google/maps';

import { getSetting, newMutation } from 'meteor/vulcan:core';

import Places from '../modules/collection.js';

const googleMapsSetting = getSetting('googlemaps');

if (!googleMapsSetting) {
  throw new Error('Please fill in your Google Maps API Key or disable the Places package.');
}

const googleMapsClient = googleMaps.createClient({
  key: googleMapsSetting.apiKey
});

const { geocode, placesAutoComplete } = googleMapsClient;

// googleMapsClient =>
// {
//   directions: [Function],
//   distanceMatrix: [Function],
//   elevation: [Function],
//   elevationAlongPath: [Function],
//   geocode: [Function],
//   geolocate: [Function],
//   reverseGeocode: [Function],
//   places: [Function],
//   placesNearby: [Function],
//   place: [Function],
//   placesPhoto: [Function],
//   placesAutoComplete: [Function],
//   placesQueryAutoComplete: [Function],
//   snapToRoads: [Function],
//   nearestRoads: [Function],
//   speedLimits: [Function],
//   snappedSpeedLimits: [Function],
//   timezone: [Function]
// }

export { geocode, placesAutoComplete }

/**
 * Get details from GoogleMaps based on a placeId
 * @param placeId
 * @param callback
 */
export const getPlaceDetails = (placeId, callback) => {
  googleMapsClient.place({
    placeid: placeId,
    language: getSetting('language', 'en')
  }, Meteor.bindEnvironment(callback));
};

const formatPlace = result => {
  const data = result.json.result;
  const place = _.pick(data, ['name', 'url', 'website', 'adr_address']);
  place._id = result.json.result.place_id;
  place.location = { type: 'Point', coordinates: [ data.geometry.location.lat, data.geometry.location.lng ] }
  return place;
};

/**
 *
 * @param placeId
 */
export const checkAndAddPlace = placeId => {
  const existingPlace = Places.findOne({ _id: placeId });
  if (!existingPlace) {
    getPlaceDetails(placeId, (error, result) => {
      const place = formatPlace(result);
      return newMutation({
        collection: Places,
        document: place, 
        validate: false,
      });
    });
  }
};