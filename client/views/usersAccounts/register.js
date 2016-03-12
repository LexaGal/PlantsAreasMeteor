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

Template.register.onRendered( function() {
    $( "#registerForm" ).validate({
        messages: {
            first_name: {
                required: "Need first name here!"
            },
            last_name: {
                required: "Need last name here!"
            },
            email_address: {
                required: "Need email address here!"
            },
            password: {
                required: "Need password here!"
            },
            confirm_password: {
                required: "Confirm your password here!"
            }
        },
        highlight: function() {
            $("[id*='error']").addClass('validationError')
        }
    });
});

Template.register.events({

    'submit form': function (event) {
        event.preventDefault();

        //$("#registerForm:input").each(function() {
        //    var f = 0;
        //    if (!$(this).value) {
        //        $(this).toggleClass("red");
        //        setTimeout(clearError, 5000, $(this));
        //        f = 1;
        //    }
        //    if (f == 1) {
        //        Errors.throw("Please enter your data");
        //    }
        //});

        var first_name =  $(event.target).find('[name=first_name]');
        var last_name = $(event.target).find('[name=last_name]');

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
            first_name: first_name.val(),
            last_name: last_name.val(),
            email: email.val(),
            passwordToken: Package.sha.SHA256(password.val()),
            createdAt: new Date().toISOString(),
            name: first_name.val() + " " + last_name.val()
        };

        Meteor.call('addUser', userData, function (error, user) {
            if (user == null) {
                Errors.throw("An error occurred during saving user data");
            } else {
                Session.set("UserNET", user);
                $('#loginLabel').text("You are logged in as ".concat(UserNET.name)).append(html);
                $('.dropdown.open .dropdown-toggle').dropdown('toggle');
            }
        });
    }
});