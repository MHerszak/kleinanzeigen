/*

Custom fields on Users collection

*/

import React from 'react';

import Users from 'meteor/vulcan:users';

// import Tags from 'meteor/vulcan:forms-tags';

import { EmbedlyURL } from 'meteor/vulcan:embed';

Users.addField([
  /**
    Count of the user's posts
  */
  {
    fieldName: 'postCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      viewableBy: ['guests'],
    }
  },
  /**
    The user's associated posts (GraphQL only)
  */
  {
    fieldName: 'posts',
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: {
        arguments: 'limit: Int = 5',
        type: '[Post]',
        resolver: (user, { limit }, { currentUser, Users, Posts }) => {
          const posts = Posts.find({ userId: user._id }, { limit }).fetch();

          // restrict documents fields
          const viewablePosts = _.filter(posts, post => Posts.checkAccess(currentUser, post));
          const restrictedPosts = Users.restrictViewableFields(currentUser, Posts, viewablePosts);

          return restrictedPosts;
        }
      }
    }
  }
]);

import { Posts } from './collection';

const formGroups = {
  admin: {
    name: "admin",
    order: 2
  }
};

const isOwnerOrAdmin = (user, document) => Users.owns(user, document) || Users.isAdmin(user);

Posts.addField([
  {
    fieldName: 'shortTitle',
    fieldSchema: {
      type: String,
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin,
      control: "text"
    }
  },
  {
    fieldName: 'sponsored',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      defaultValue: false,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin
    }
  },
  {
    fieldName: 'sponsoredCandidate',
    fieldSchema: {
      type: Boolean,
      optional: true,
      defaultValue: false,
      viewableBy: isOwnerOrAdmin,
      insertableBy: ['members'],
      editableBy: ['members'],
      hidden: true
    }
  },
  {
    fieldName: 'sponsorshipPrice',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: isOwnerOrAdmin,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      group: formGroups.admin
    }
  },
  {
    fieldName: 'featured',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      defaultValue: false,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin
    }
  },
  // {
  //   fieldName: 'categories',
  //   fieldSchema: {
  //     type: Array,
  //     control: Tags,
  //     afterComponent: <a target="_blank" className="suggest-category-link" href="mailto:michel.herszak@gmail.com">
  //       Suggest new categories
  //     </a>
  //   }
  // },

  {
    fieldName: 'paidAt',
    fieldSchema: {
      type: Date,
      optional: true,
      viewableBy: isOwnerOrAdmin,
      editableBy: ['admins'],
      control: 'datetime',
    }
  },

  {
    fieldName: 'chargeIds',
    fieldSchema: {
      type: Array,
      optional: true,
    }
  },

  {
    fieldName: 'chargeIds.$',
    fieldSchema: {
      type: String,
      optional: true,
    }
  },

]);

Posts.addField([
  {
    fieldName: 'url',
    fieldSchema: {
      control: EmbedlyURL, // we are just extending the field url, not replacing it
    }
  },
  {
    fieldName: 'thumbnailUrl',
    fieldSchema: {
      type: String,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      hidden: true
    }
  },
  {
    fieldName: 'media',
    fieldSchema: {
      type: Object,
      optional: true,
      blackbox: true,
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'sourceName',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'sourceUrl',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
    }
  }
]);

// Posts.removeField("sticky");
Users.removeField('notifications_posts');
// Users.removeField("bio");
// Users.removeField("website");
