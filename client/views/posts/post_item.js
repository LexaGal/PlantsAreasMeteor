Template.postItem.helpers({

    ownPost: function () {
        return Meteor.user() && this.userId == Meteor.userId();
    },

    domain: function () {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },

});