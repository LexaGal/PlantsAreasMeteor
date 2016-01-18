Template.messageItem.events({

    'click #closeMessage': function () {
        Meteor.call('updateMessage', this._id, function(error) {
            if (error)
                Errors.throw(error.reason);
        });
    }
});