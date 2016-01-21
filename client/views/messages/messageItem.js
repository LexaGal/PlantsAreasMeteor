Template.messageItem.events({

    'click #closeMessage': function (event) {
        event.preventDefault(); //!!!
        Meteor.call('updateMessage', this._id, function (error) {
            if (error) {
                Errors.throw(error.reason);
            }
        });
        //$('.dropdown.close .dropdown-toggle').dropdown('toggle');
    }
});