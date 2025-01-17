/*

Fragments on the Users collection

http://docs.vulcanjs.org/fragments.html

*/

import { registerFragment, extendFragment } from 'meteor/vulcan:core';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
registerFragment(`
  fragment VotedItem on Vote {
    # vulcan:voting
    documentId
    power
    votedAt
  }
`);

extendFragment('PostsPage', `
  sponsorshipPrice
  sponsoredCandidate
  paidAt
  shortTitle
`);

// ------------------------------ Users ------------------------------ //

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
  }
`);

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin
    bio
    htmlBio
    twitterUsername
    website
    groups
    karma
    # vulcan:posts
    postCount
    # vulcan:comments
    commentCount
  }
`);

// extendFragment('UsersAdmin', `
//   rooms(limit: 5){
//     ...RoomsItemFragment
//   }
//   bookings(limit: 5){
//     ...BookingsItemFragment
//   }
//   reviews(limit: 5){
//     ...ReviewsDefaultFragment
//   }
// `);
//
// extendFragment('UsersCurrent', `
//   rooms(limit: 5){
//     ...RoomsItemFragment
//   }
//   bookings(limit: 5){
//     ...BookingsItemFragment
//   }
//   reviews(limit: 5){
//     ...ReviewsDefaultFragment
//   }
// `);
