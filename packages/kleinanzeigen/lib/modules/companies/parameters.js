import escapeStringRegexp from 'escape-string-regexp';

import { addCallback, removeCallback, Utils } from 'meteor/vulcan:core';

// Category Companies Parameters
// Add a "categories" property to terms which can be used to filter *all* existing Posts views.
function CompaniesPlacesParameters(parameters, terms, apolloClient) {
  const placeId = terms.placeId;
  if (placeId) {
    parameters.selector = {...parameters.selector, placeId: decodeURIComponent(placeId)}
  }
  return parameters;
}
addCallback('companies.parameters', CompaniesPlacesParameters);

function addSearchQueryParameter2 (parameters, terms) {
  // console.log(terms);
  if(terms.query) {
    const query = escapeStringRegexp(terms.query);
    parameters = Utils.deepExtend(true, parameters, {
      selector: {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { url: { $regex: query, $options: 'i' } },
          // note: we cannot search the body field because it's not published
          // to the client. If we did, we'd get different result sets on
          // client and server
          { excerpt: { $regex: query, $options: 'i' } },
          { placeName: { $regex: query, $options: 'i' } },
        ]
      }
    });
  }
  return parameters;
}
// removeCallback('companies.parameters', 'addSearchQueryParameter');
addCallback('companies.parameters', addSearchQueryParameter2);

// import moment from 'moment';

// function addFromToParameters (parameters, terms, apolloClient, context) {
//
//   if (terms.from || terms.to) {
//
//     const mFrom = moment(terms.from, 'YYYY-MM-DD').startOf('day');
//     const mTo = moment(terms.to, 'YYYY-MM-DD').endOf('day');
//
//     /*
//     Find all bookings during that period that:
//     - End between 'from' and 'to'
//     - Start between 'from' and 'to'
//     */
//     const currentBookings = context.Bookings.find({$or: [
//       { $and: [{ startAt: { '$gt': mFrom.toDate() } }, { startAt: { '$lt': mTo.toDate() } }] },
//       { $and: [{ endAt: { '$gt': mFrom.toDate() } }, { endAt: { '$lt': mTo.toDate() } }] },
//     ]}).fetch();
//     const bookingsRoomIds = _.unique(_.pluck(currentBookings, 'roomId'));
//
//     parameters.selector._id = {$nin: bookingsRoomIds};
//   }
//
//   return parameters;
// }
// addCallback('companies.parameters', addFromToParameters);

// function addFiltersParameter (parameters, terms, apolloClient) {
//
//   if (terms.filters) {
//     const filters = Array.isArray(terms.filters) ? terms.filters : [terms.filters];
//     parameters.selector.amenities = { $all: filters };
//   }
//
//   return parameters;
// }
// addCallback('companies.parameters', addFiltersParameter);

function addSwNeParameters (parameters, terms, apolloClient) {

  if (terms.sw && terms.ne) {
    parameters.selector.location = {
      $geoWithin: {
        $box: [
          [terms.sw.lng, terms.sw.lat],
          [terms.ne.lng, terms.ne.lat]
        ]
      }
    }
  }

  return parameters;
}
addCallback('companies.parameters', addSwNeParameters);