import { newMutation, registerSetting, getSetting } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';

import moment from 'moment';

import { Posts } from '../../modules/posts/index.js';

import { Comments } from '../../modules/comments/index.js';

import { Categories } from '../../modules/categories/index.js';

registerSetting('forum.seedOnStart', true, 'Seed the app with dummy content on startup');

if (getSetting('forum.seedOnStart')) {

  const dummyFlag = {
    fieldName: 'isDummy',
    fieldSchema: {
      type: Boolean,
      optional: true,
      hidden: true
    }
  };
  Users.addField(dummyFlag);
  Posts.addField(dummyFlag);
  Comments.addField(dummyFlag);

  Posts.addField({
    fieldName: 'dummySlug',
    fieldSchema: {
      type: String,
      optional: true,
      hidden: true // never show this
    }
  });

  const toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  const createPost = async (slug, postedAt, username, thumbnail) => {

    const user = await Users.findOne({ username });

    if(user) {
      const post = {
        postedAt,
        body: Assets.getText("lib/assets/content/" + slug + ".md"),
        title: toTitleCase(slug.replace(/_/g, ' ')),
        dummySlug: slug,
        isDummy: true,
        userId: user._id
      };

      if (typeof thumbnail !== "undefined")
        post.thumbnailUrl = "/packages/example-forum/lib/assets/images/" + thumbnail;

      newMutation({
        collection: Posts,
        document: post,
        currentUser: user,
        validate: false
      });
    }
  };

  const createComment = async function (slug, username, body, parentBody) {

    const user = await Users.findOne({ username: username });
    const post = await Posts.findOne({ dummySlug: slug });

    if(user) {
      const comment = {
        postId: post._id,
        userId: user._id,
        body: body,
        isDummy: true,
        disableNotifications: true
      };

      const parentComment = Comments.findOne({ body: parentBody });

      if (parentComment)
        comment.parentCommentId = parentComment._id;

      newMutation({
        collection: Comments,
        document: comment,
        currentUser: user,
        validate: false
      });
    }
  };

  const createUser = function (username, email) {
    const user = {
      username,
      email,
      isDummy: true
    };
    newMutation({
      collection: Users,
      document: user,
      validate: false
    });
  };

  const createDummyUsers = function () {
    console.log('// inserting dummy users…');
    createUser('Bruce', 'dummyuser1@telescopeapp.org');
    createUser('Arnold', 'dummyuser2@telescopeapp.org');
    createUser('Julia', 'dummyuser3@telescopeapp.org');
  };

  const createDummyPosts = function () {
    console.log('// inserting dummy posts');

    createPost("read_this_first", moment().toDate(), "Bruce", "telescope.png");

    createPost("deploying", moment().subtract(10, 'minutes').toDate(), "Arnold");

    createPost("customizing", moment().subtract(3, 'hours').toDate(), "Julia");

    createPost("getting_help", moment().subtract(1, 'days').toDate(), "Bruce", "stackoverflow.png");

    createPost("removing_getting_started_posts", moment().subtract(2, 'days').toDate(), "Julia");

  };

  const createDummyComments = function () {
    console.log('// inserting dummy comments…');
    createComment("read_this_first", "Bruce", "What an awesome app!");
    createComment("deploying", "Arnold", "Deploy to da choppah!");
    createComment("deploying", "Julia", "Do you really need to say this all the time?", "Deploy to da choppah!");
    createComment("customizing", "Julia", "This is really cool!");
    createComment("removing_getting_started_posts", "Bruce", "Yippee ki-yay!");
    createComment("removing_getting_started_posts", "Arnold", "I'll be back.", "Yippee ki-yay!");
  };

  Vulcan.removeGettingStartedContent = () => {
    Users.remove({ 'profile.isDummy': true });
    Posts.remove({ isDummy: true });
    Comments.remove({ isDummy: true });
    Categories.remove({ isDummy: true });
    console.log('// Getting started content removed');
  };

  Meteor.startup(function () {
    // insert dummy content only if createDummyContent hasn't happened and there aren't any posts or users in the db
    if (!Users.find().count()) {
      createDummyUsers();
    }
    if (!Posts.find().count()) {
      createDummyPosts();
    }
    if (!Comments.find().count()) {
      createDummyComments();
    }
  });

}
