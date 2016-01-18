UsersNET = new Mongo.Collection('usersNET');
UserNET = null;

Meteor.methods({
    validateUser: function(userData) {
        check(userData.first_name, String);
        check(userData.last_name, String);
        check(userData.passwordHash, String);

        var user = UsersNET.findOne({
            first_name: userData.first_name,
            last_name: userData.last_name,
            passwordToken: userData.passwordHash
        });

        if (user) {
            console.log(user._id);
            return user;
        }
        return null;
    }
});
