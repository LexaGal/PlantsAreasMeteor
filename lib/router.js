Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [ Meteor.subscribe('notifications')];
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().fetch().length === this.limit();
    var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
    return {
      posts: this.posts(),
      nextPath: hasMore ? nextPath : null
    };
  }
});



Router.map(function() {

  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return Meteor.subscribe('comments', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', { path: '/submit' });

  this.route('postsList', {
    path: '/:postsLimit?',
    //waitOn: function() {
    //  var postsLimit = parseInt(this.params.postsLimit) || 5;
    //  return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: postsLimit});
    //},
    //data: function() {
    //  var limit = parseInt(this.params.postsLimit) || 5;
    //  return {
    //    posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
    //  }
    //}
    controller : PostsListController
  });
});

var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('loading');
    }
    else {
      this.render('accessDenied');
    }
  }
  else {
    this.next();
  }
};

Router.before(requireLogin, {only: 'postSubmit'});
//Router.before(function() { Errors.clearSeen(); });