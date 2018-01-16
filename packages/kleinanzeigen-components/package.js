Package.describe({
  name: "kleinanzeigen:components",
  summary: "Components for client",
  version: '1.8.1',
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.6");

  api.use([
    'vulcan:core@1.8.1',

    'session',
  ]);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
