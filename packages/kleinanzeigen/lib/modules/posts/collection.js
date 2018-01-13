/*

Posts collection

*/

import React from 'react';

import schema from './schema.js';

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';

import Tags from 'meteor/vulcan:forms-tags';

import { makeCloudinary } from 'meteor/vulcan:cloudinary';

import { EmbedlyURL } from 'meteor/vulcan:embed';

/**
 * @summary The global namespace for Posts.
 * @namespace Posts
 */
export const Posts = createCollection({

  collectionName: 'Posts',

  typeName: 'Post',

  schema,

  resolvers: getDefaultResolvers('Posts'),

  mutations: getDefaultMutations('Posts'),

});

// refactor: moved here from schema.js
Posts.config = {};

Posts.config.STATUS_PENDING = 1;
Posts.config.STATUS_APPROVED = 2;
Posts.config.STATUS_REJECTED = 3;
Posts.config.STATUS_SPAM = 4;
Posts.config.STATUS_DELETED = 5;


/**
 * @summary Posts statuses
 * @type {Object}
 */
Posts.statuses = [
  {
    value: 1,
    label: 'pending'
  },
  {
    value: 2,
    label: 'approved'
  },
  {
    value: 3,
    label: 'rejected'
  },
  {
    value: 4,
    label: 'spam'
  },
  {
    value: 5,
    label: 'deleted'
  }
];

Posts.checkAccess = (currentUser, post) => {
  if (Users.isAdmin(currentUser) || Users.owns(currentUser, post)) { // admins can always see everything, users can always see their own posts
    return true;
  } else if (post.isFuture) {
    return false;
  } else {
    const status = _.findWhere(Posts.statuses, {value: post.status});
    return Users.canDo(currentUser, `posts.view.${status.label}`);
  }
};

makeCloudinary({ collection: Posts, fieldName: 'thumbnailUrl' });

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
  {
    fieldName: 'categories',
    fieldSchema: {
      type: Array,
      control: Tags,
      afterComponent: <a target="_blank" className="suggest-category-link" href="mailto:michel.herszak@gmail.com">
        Suggest new categories
      </a>
    }
  },

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
