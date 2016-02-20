var html = $.parseHTML("<b class=\"caret\"></b>");

var isPasswordConfirmed = function (password, confirmedPassword) {
    return password == confirmedPassword;
};

Template.register.events({

    'submit form': function (event) {
        event.preventDefault();

        var password = $(event.target).find('[name=password ]');
        var confirmPassword = $(event.target).find('[name=confirm_password]');

        if (!isPasswordConfirmed(password.val(), confirmPassword.val())) {
            Errors.throw("Password is not confirmed");
            password.style.backgroundColor = "red";
            confirmPassword.style.backgroundColor = "red";
            return;
        }

        var userData = {
            first_name: $(event.target).find('[name=first_name]').val(),
            last_name: $(event.target).find('[name=last_name]').val(),
            email_address: $(event.target).find('[name=email_address]').val(),
            passwordToken: Package.sha.SHA256($(event.target).find('[name=password]').val()),
            createdAt: new Date().toISOString(),
            name: $(event.target).find('[name=first_name]').val() + " " + $(event.target).find('[name=last_name]').val()
        };

        Meteor.call('addUser', userData, function () {
            $('#loginLabel').text("You are logged in as ".concat(UserNET.name)).append(html);
            $('.dropdown.open .dropdown-toggle').dropdown('toggle');
            Router.go('newPlantsareas');
        });
    }

    //'click #submitLogout': function(event){
    //    event.preventDefault();
    //
    //    UserNET = null;
    //    $('#loginLabel').text("Log in").append(html);
    //    $('.dropdown.open .dropdown-toggle').dropdown('toggle');
    //    Router.go('newPlantsareas');
    //}
});

//Template.userAccount.helpers({
//

//});