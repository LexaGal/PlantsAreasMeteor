Template.notificationItem.helpers({

    notificationInfo: function() {
        return this.dateTime + " " + this.info;
    }
});

Template.notificationItem.events({

    'click a': function() {
        Meteor.call('updateNotification', this._id);
    }
});
