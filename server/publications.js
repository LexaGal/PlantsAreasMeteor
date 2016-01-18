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

Meteor.publish('messages', function (plantsareaId) {
    return Messages.find({plantsareaId: plantsareaId, read: "False"});
});

Meteor.publish('singleMessage', function (id) {
    return id && Messages.find(id);
});

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
