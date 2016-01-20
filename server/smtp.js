//Meteor.startup(function () {
//    // 1. Set up stmp
//    //   your_server would be something like 'smtp.gmail.com'
//    //   and your_port would be a number like 25
//
//    process.env.MAIL_URL = 'smtp://' +
//        encodeURIComponent('galushkin_aleksey') + ':' +
//        encodeURIComponent('qYYfO8Di') + '@' +
//        encodeURIComponent('smtp.gmail.com') + ':' + 25;
//
//    // 2. Format the email
//    //-- Set the from address
//    Accounts.emailTemplates.from = 'galushkin.aleksey@gmail.com';
//
//    //-- Application name
//    Accounts.emailTemplates.siteName = 'galushkin_aleksey_app';
//
//    //-- Subject line of the email.
//    Accounts.emailTemplates.verifyEmail.subject = function(user) {
//        return 'Confirm Your Email Address for galushkin_aleksey_pp';
//    };
//
//    //-- Email text
//    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
//        return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
//    };
//
//    // 3.  Send email when account is created
//    Accounts.config({
//        sendVerificationEmail: true
//    });
//});
Meteor.startup(function(){
    process.env.MAIL_URL = 'smtp://galushkin.aleksey:galushkin.aleksey1@smtp.gmail.com:587/'
});

Meteor.methods({
    sendEmail: function (to, subject, text) {
        check([to, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: "galushkin.aleksey@gmail.com",
            subject: subject,
            text: text
        });
    }
});
