Template.messages.helpers({
    messages: function() {
        return Messages.find({measurableType: this.measurableType, read: "False"});
    },
    messagesCount: function(){
        return Messages.find({measurableType: this.measurableType, read: "False"}).count();
    }
});

Template.messages.events({
    'click #closeMessages': function () {
        Meteor.call('updateMessages', this.measurableType, function(error) {
            if (error)
                Errors.throw(error.reason);
        });
    }
});