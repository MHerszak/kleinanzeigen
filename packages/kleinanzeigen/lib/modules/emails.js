import moment from 'moment';

import VulcanEmail from 'meteor/vulcan:email';

import Users from 'meteor/vulcan:users';

import { Charges } from 'meteor/vulcan:payments';

import { Posts } from "./../modules";

const getTestPost = postId => typeof Posts.findOne(postId) === 'undefined' ? { post: Posts.findOne({ sponsored: true, paidAt: { $exists: true } })} : { post: Posts.findOne(postId) };

const formatDate = date => moment(new Date(date)).format('dddd, MMMM D YYYY');

const getSponsoredProperties = data => {
  const post = data.post;
  const user = Users.findOne(post.userId);
  const charge = Charges.findOne({_id: {$in: post.chargeIds}});
  return {
    ...Posts.getNotificationProperties(data),
    description: post.htmlBody,
    paidAt: formatDate(post.paidAt),
    postedAt: formatDate(post.postedAt),
    profileUrl: Users.getProfileUrl(user),
    fee: charge.data.amount / 100
  }
};

VulcanEmail.addEmails({

  sponsoredPaid: {
    template: 'sponsoredPaid',
    path: '/email/sponsored-paid/:_id?',
    getProperties: getSponsoredProperties,
    subject: 'Thanks for submitting a sponsored link',
    getTestObject: getTestPost,
  },

  sponsoredApproved: {
    template: 'sponsoredApproved',
    path: '/email/sponsored-approved/:_id?',
    getProperties: getSponsoredProperties,
    subject: 'Your sponsored link has been approved',
    getTestObject: getTestPost,
  },

  test: {
    template: "test",
    path: "/email/test",
    data() {
      return {date: new Date()};
    },
    subject() {
      return "This is a test";
    },
  },

  companiesNew: {
    template: 'companiesNew',
    path: '/email/companiesNew',
    subject(data) {
      const room = _.isEmpty(data) ? {name: '[name]'} : data.RoomsSingle;
      return `A new company has been created: ${room.name}`;
    },
    query: `
      query OneCompany($documentId: String){
        CompaniesSingle(documentId: $documentId){
          name
          description
          user{
            _id
            displayName
          }
        }
      }
    `,
    testVariables: {}
  },

});
