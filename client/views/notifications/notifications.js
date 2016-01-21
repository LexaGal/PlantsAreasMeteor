Template.notifications.helpers({
    notifications: function() {
        return Notifications.find({userId: UserNET._id, read: "False"});
    },
    notificationsCount: function() {
        return Notifications.find({userId: UserNET._id, read: "False"}).count();
    }
});

//Template.notification.helpers({
//    notificationPostPath: function() {
//        return Router.routes.postPage.path({_id: this.postId});
//    }
//});
