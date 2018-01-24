Package.describe({
  name: 'kleinanzeigen',
});

Package.onUse((api) => {
  api.use([

    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@1.8.5',

    // vulcan packages
    'vulcan:forms@1.8.5',
    'vulcan:forms-upload@1.8.5',
    'vulcan:accounts@1.8.5',
    'vulcan:payments@1.8.5',
    'vulcan:places@1.3.2',
    // 'vulcan:debug',
    'vulcan:newsletter@1.8.5',
    'kleinanzeigen:components@1.8.5',
    'vulcan:forms-tags@1.8.5',
    'vulcan:admin@1.8.5',
    'vulcan:email@1.8.5',
    'vulcan:voting@1.8.5',
    'vulcan:embed@1.8.5',
    'vulcan:cloudinary@1.8.5',
    'vulcan:events@1.8.5',
    'vulcan:notifications@1.7.0',
  ]);

  api.addFiles(['lib/stylesheets/main.scss'], ['client']);

  api.addAssets([

    'lib/assets/content/read_this_first.md',
    'lib/assets/content/deploying.md',
    'lib/assets/content/customizing.md',
    'lib/assets/content/getting_help.md',
    'lib/assets/content/removing_getting_started_posts.md',

    'lib/assets/markdown/terms.md',
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
