var html = $.parseHTML("<b class=\"caret\"></b>");

Template.userAccount.helpers({
    user: function () {
        return Session.get("UserNET") ? "You are logged in as ".concat(Session.get("UserNET").name) : "Log in";
    }
});

Template.userAccount.events({

    'submit form': function (event) {
        event.preventDefault();

        var userData = {
            first_name: $(event.target).find('[name=first_name]').val(),
            last_name: $(event.target).find('[name=last_name]').val(),
            passwordToken: Package.sha.SHA256($(event.target).find('[name=password]').val())
        };

        Meteor.call('validateUser', userData, function (error, user) {
            if (user == null) {
                Errors.throw("User with such credentials do not exist");
            } else {
               Session.set("UserNET", user);
                //$('#loginLabel').text("You are logged in as ".concat(Session.get("UserNET").name)).append(html);
                $('.dropdown.open .dropdown-toggle').dropdown('toggle');
                Router.go('newPlantsareas');
            }
        });
    },

    'click #submitLogout': function(event){
        event.preventDefault();

        Session.set("UserNET", null);
        //$('#loginLabel').text("Log in").append(html);
        $('.dropdown.open .dropdown-toggle').dropdown('toggle');
        Router.go('newPlantsareas');
}
});

Template.userAccount.helpers({

    isLoggedIn: function () {
        return Session.get("UserNET");
    }
});