Template.messagesPage.helpers({
    messages: function() {
        return Messages.find({read: "False"});
    },
    messagesCount: function() {
        return Messages.find({read: "False"}).count();
    },

    currentMessage: function() {
        return this.currMessage._id == this._id;
    }
});