var html = $.parseHTML("<b class=\"caret\"></b>");

var isPasswordConfirmed = function (password, confirmedPassword) {
    return password == confirmedPassword;
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var clearError = function (res) {
    res.toggleClass("ok");
};

Template.register.events({

    'submit form': function (event) {
        event.preventDefault();

        var password = $(event.target).find('[name=password]');
        var confirmPassword = $(event.target).find('[name=confirm_password]');

        if (!isPasswordConfirmed(password.val(), confirmPassword.val())) {
            Errors.throw("Password is not confirmed");
            password.toggleClass("red");
            setTimeout(clearError, 5000, password);
            confirmPassword.toggleClass("red");
            setTimeout(clearError, 5000, confirmPassword);
            return;
        }

        var email = $(event.target).find('[name=email_address]');
        if (!validateEmail(email.val())){
            Errors.throw("Invalid email address");
            email.toggleClass("red");
            setTimeout(clearError, 5000, email);
            return;
        }

        var userData = {
            first_name: $(event.target).find('[name=first_name]').val(),
            last_name: $(event.target).find('[name=last_name]').val(),
            email: email.val(),
            passwordToken: Package.sha.SHA256(password.val()),
            createdAt: new Date().toISOString(),
            name: $(event.target).find('[name=first_name]').val() + " " + $(event.target).find('[name=last_name]').val()
        };

        Meteor.call('addUser', userData, function () {
            $('#loginLabel').text("You are logged in as ".concat(UserNET.name)).append(html);
            $('.dropdown.open .dropdown-toggle').dropdown('toggle');
            Router.go('newPlantsareas');
        });
    }
});