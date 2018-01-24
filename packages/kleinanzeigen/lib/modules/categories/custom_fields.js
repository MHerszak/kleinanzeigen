/*

Custom fields on Posts collection

*/

import React from 'react';

import { Posts } from './../../modules/posts/index';

import { getCategoriesAsOptions } from './schema.js';

// import Tags from 'meteor/vulcan:forms-tags';

Posts.addField([
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
    fieldName: 'categories',
    fieldSchema: {
      type: Array,
      control: 'checkboxgroup',
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      form: {
        // multiple: true,
        noselect: true,
        type: 'bootstrap-category',
        order: 50,
        options: formProps => getCategoriesAsOptions(formProps.client),
      },
      resolveAs: {
        fieldName: 'categories',
        type: '[Category]',
        resolver: async (post, args, { currentUser, Users, Categories }) => {
          if (!post.categories) return [];
          const categories = _.compact(await Categories.loader.loadMany(post.categories));
          return Users.restrictViewableFields(currentUser, Categories, categories);
        }
      }
    }
  },
  {
    fieldName: 'categories.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  }
]);
