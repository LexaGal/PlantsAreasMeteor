Meteor.publish('sensors', function (plantsareaId) {
    return Sensors.find({plantsareaId: plantsareaId});
});

Meteor.publish('plantsareas', function (userId ,options) {
        return PlantsAreas.find({userId: userId}, options);
});

//Meteor.publish('posts', function (options) {
//    return Posts.find({}, options);
//});

//Meteor.publish('comments', function (postId) {
//    return Comments.find({postId: postId});
//});

//Meteor.publish('notifications', function () {
//    return Notifications.find({userId: this.userId, read: false});
//});

Meteor.publish('singlePlantsarea', function (id) {
    return id && PlantsAreas.find(id);
});

Meteor.publish('usersNET', function()
{
   return UsersNET.find();
});

//Meteor.publish('currUser', function () {
//    return Meteor.users.find({_id: this.userId},{
//        fields: {
//            'services.google.name': 1,
//            'services.google.picture': 1,
//            'services.google.email': 1
//        }
//    })
//});
