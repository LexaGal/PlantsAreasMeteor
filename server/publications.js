Meteor.publish('sensors', function (plantsareaId) {
    return Sensors.find({plantsareaId: plantsareaId});
});

Meteor.publish('plantsareas', function (userId ,options) {
        return PlantsAreas.find({userId: userId}, options);
});

Meteor.publish('messages', function (plantsareaId) {
    return Messages.find({plantsareaId: plantsareaId, read: "False"});
});

Meteor.publish('singleMessage', function (id) {
    return id && Messages.find(id);
});

Meteor.publish('singlePlantsarea', function (id) {
    return id && PlantsAreas.find(id);
});

Meteor.publish('singleSensor', function (id) {
    return id && Sensors.find(id);
});

Meteor.publish('usersNET', function()
{
   return UsersNET.find();
});

Meteor.publish('notifications', function (userId) {
    return Notifications.find({userId : userId, read: "False"});
});

