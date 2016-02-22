UsersNET = new Mongo.Collection('usersNET');
UserNET = null;

Meteor.methods({
    validateUser: function(userData) {
        check(userData.first_name, String);
        check(userData.last_name, String);
        check(userData.passwordToken, String);

        var user = UsersNET.findOne({
            first_name: userData.first_name,
            last_name: userData.last_name,
            passwordToken: userData.passwordToken
        });

        if (user) {
            return user;
        }
        return null;
    },

    addUser: function(userData) {
        check(userData.first_name, String);
        check(userData.last_name, String);
        check(userData.email, String);
        check(userData.passwordToken, String);

        var user = UsersNET.findOne({email: userData.email});

        if (user) {
            Errors.throw("User with that email already exists");
            return;
        }

        var id = UsersNET.insert(userData);
        return UsersNET.findOne({_id: id});
    }
});
