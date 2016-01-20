Template.messagePage.helpers({
    /*messages: function() {
     return Messages.find({read: "False"});
     },
     messagesCount: function() {
     return Messages.find({read: "False"}).count();
     },

     currentMessage: function() {
     return this.currMessage._id == this._id;
     },
     */
    emails: function () {
        return UsersNET.find({_id: {$ne: this._id}}, {fields: {_id: 1, name: 1, email: 1}});
    },

    emailItem: function () {
        return this.email;
    },

    ownerId: function () {
        return this._id;
    },

    emailOwner: function () {
        return this.name;
    },

    emailsCount: function () {
        return UsersNET.find({_id: {$ne: this._id}}, {fields: {_id: 1, name: 1, email: 1}}).count();
    }

});

var emails = [];
var i = 0;

Template.messagePage.events({

    'change #emailsSelect': function () {

        var email = $('#emailsSelect').find(":selected").text();
        for (var j = 0; j < i; j++) {
            if (emails[j] == email) {
                Errors.throw(email + " is already added");
                return;
            }
        }
        emails.push(email);
        i++;

        $('#chosenEmails:text').val(function (index, val) {
            return val + email + "  ";
        });
    },

    'click #sendEmail': function () {

        var emailSubject = "New message from plants area " + this.plantsareaId;

        var emailText = function (object, to) {
            return "Hi, " + to + "!\n" +
                "Send on: " + object.dateTime +
                ", message type: " + object.messageType +
                ", measurable type: " + object.measurableType +
                ", parameter value: " + object.parameterValue + ".";
        };

        if (emails.length == 0) {
            Errors.throw("Choose addresses for emailing");
        }

        for (var j = 0; j < i; j++) {
            var email = emails[j].split(/[()]+/);
            var emailTo = email[0];
            var emailAddress = email[1];

            Meteor.call('sendEmail', emailAddress, emailSubject, emailText(this, emailTo), function (error) {
                if (error) {
                    Errors.throw(error.reason);
                    $('#sendResult').text('Emails are not sent');
                } else {
                    $('#sendResult').text('All emails are sent');
                }
            });
        }
    }
});