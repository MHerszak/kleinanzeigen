Package.describe({
  name: 'kleinanzeigen',
});

Package.onUse((api) => {
  api.use([

    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@1.8.3',

    // vulcan packages
    'vulcan:forms',
    'vulcan:forms-upload',
    'vulcan:accounts@2.8.3',
    'vulcan:payments',
    'vulcan:places',
    // 'vulcan:maps',
    'vulcan:newsletter',
    'kleinanzeigen:components',
    'vulcan:forms-tags',
    'vulcan:admin',
    'vulcan:email',
    'vulcan:voting',
    'vulcan:embed',
    'vulcan:cloudinary',
    'vulcan:events',
    'vulcan:notifications',
  ]);

  api.addFiles(['lib/stylesheets/main.scss'], ['client']);

  api.addAssets([

    'lib/assets/content/read_this_first.md',
    'lib/assets/content/deploying.md',
    'lib/assets/content/customizing.md',
    'lib/assets/content/getting_help.md',
    'lib/assets/content/removing_getting_started_posts.md',

    // 'lib/assets/markdown/about.md',
    // 'lib/assets/markdown/guidelines.md',
    // 'lib/assets/markdown/sponsor.md',
    // 'lib/assets/markdown/sponsor1.md',
    // 'lib/assets/markdown/sponsor2.md',
    // 'lib/assets/markdown/sponsor3.md',
    // 'lib/assets/markdown/sponsor4.md',

    'lib/server/email/templates/common/test.handlebars',
    'lib/server/email/templates/common/wrapper.handlebars',
    'lib/server/email/templates/comments/newComment.handlebars',
    'lib/server/email/templates/comments/newReply.handlebars',
    'lib/server/email/templates/posts/newPendingPost.handlebars',
    'lib/server/email/templates/posts/newPost.handlebars',
    'lib/server/email/templates/posts/postApproved.handlebars',
    'lib/server/email/templates/users/accountApproved.handlebars',
    'lib/server/email/templates/users/newUser.handlebars',
    'lib/server/email/templates/newsletter/newsletter.handlebars',
    'lib/server/email/templates/newsletter/newsletterConfirmation.handlebars',
    'lib/server/email/templates/newsletter/postItem.handlebars',
    'lib/server/email/templates/companies/companiesNew.handlebars',

  ], ['server']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
