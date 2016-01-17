Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      //Meteor.subscribe('notifications'),
      Meteor.subscribe('usersNET')];
      //Meteor.subscribe('currUser')];
  }
});

PlantsareasListController = RouteController.extend({
  template: 'plantsareasList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.plantsareasLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  onBeforeAction: function() {
    this.plantsareasSub = Meteor.subscribe('plantsareas', UserNET._id, this.findOptions());
    this.next();
  },
  plantsareas: function() {
    return PlantsAreas.find({}, this.findOptions());
  },
  nextPath: function(){
    return this.route.path({plantsareasLimit: this.limit() + this.increment});
  },
  data: function() {
    var hasMore = this.plantsareas().count() === this.limit();
    return {
      plantsareas: this.plantsareas(),
      ready: this.plantsareasSub && this.plantsareasSub.ready(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPlantsareasListController = PlantsareasListController.extend({
  sort: {dateTime: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPlantsareas.path({plantsareasLimit: this.limit() + this.increment})
  }
});

BySensorsPlantsareasListController = PlantsareasListController.extend({
  sort: {numberOfSensors: -1, dateTime: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bySensorsPlantsareas.path({plantsareasLimit: this.limit() + this.increment})
  }
});

Router.map(function() {

  this.route('plantsareaPage', {
    path: '/plantsareas/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singlePlantsarea', this.params._id),
        Meteor.subscribe('sensors', this.params._id)
      ];
    },
    data: function() { return PlantsAreas.findOne(this.params._id); }
  });

  this.route('plantsareaEdit', {
    path: '/plantsareas/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('singlePlantsarea', this.params._id);
    },
    data: function() { return PlantsAreas.findOne(this.params._id); }
  });

  this.route('plantsareaSubmit', {
    path: '/submit',
    disableProgress: true
  });

  this.route('home', {
    path: '/',
    controller: NewPlantsareasListController
  });

  this.route('newPlantsareas', {
    path: '/new/:plantsareasLimit?',
    controller: NewPlantsareasListController
  });

  this.route('bySensorsPlantsareas', {
    path: '/bySensors/:plantsareasLimit?',
    controller: BySensorsPlantsareasListController
  });

});

var requireLogin = function () {
  if (!UserNET) {
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

Router.before(requireLogin, {only: 'plantsareaSubmit'});
