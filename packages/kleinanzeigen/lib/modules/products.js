/*

Products

http://docs.vulcanjs.org/payments.html

*/
// import { getSetting } from 'meteor/vulcan:core';

import { addProduct } from 'meteor/vulcan:payments';
// import moment from 'moment';
// import Rooms from './rooms/collection';

// addProduct('booking', booking => {
//
//   const numberOfNights = moment(booking.endAt).diff(moment(booking.startAt), 'days');
//   const room = booking.room || Rooms.findOne({_id: booking.roomId});
//   const amount = room.pricePerNight * booking.numberOfGuests * numberOfNights * 100;
//
//   return {
//     name: 'Book this room',
//     amount,
//     currency: 'USD',
//     description: `Book ${room.name}`,
//   }
// });

addProduct('sponsorship', post => ({
  'name': 'Kleinanzeigen Sponsorship',
  'amount': post.sponsorshipPrice * 100 || 45000,
  'currency': 'USD',
  'description': post.title
}));

// addProduct('jobPosting', job => ({
//   'name': 'Job Posting',
//   'amount': 25000,
//   'currency': 'USD',
//   'description': `${job.company}: ${job.title}`
// }));
