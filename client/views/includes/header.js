Template.header.helpers({
    activeRouteClass: function (/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function (name) {
            return Router.current() && Router.current().route.getName() === name
        });

        return active && 'active';
    },

    //photoURL: function () {
    //    if (Meteor.user()) {
    //        if (Meteor.user().services.google) {
    //            return Meteor.user().services.google.picture;
    //        } else {
    //            return "http://www4.csudh.edu/Assets/CSUDH-Sites/SLP/images/Faculty-Staff-photos/NoPhoto_icon-user-default.jpg";
    //        }
    //    } else {
    //        return "http://greenearthequities.com/files/2011/09/Opps.jpg";
    //    }
    //},
});

