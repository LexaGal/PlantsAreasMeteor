Package.describe({
  summary: "Механизм отображения ошибок приложения пользователю",
  version: "1.0.0"
});

Package.onUse(function (api, where) {
  api.versionsFrom('METEOR@1.2.1');

  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.add_files(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export)
    api.export('Errors');
});

Package.onTest(function(api) {
  api.use('errors', 'client');
  //to  C:\Users\Alex\WebstormProjects\PlantsAreas>meteor add errors
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files('errors_tests.js', 'client');
});