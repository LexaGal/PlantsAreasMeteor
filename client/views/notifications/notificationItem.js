Template.notificationItem.helpers({

    notificationInfo: function() {
        return this.dateTime + " " + this.Info;
    }
});

Template.notificationItem.events({

    'click a': function() {
        Meteor.call('updateNotification', this._id);
    }
});
