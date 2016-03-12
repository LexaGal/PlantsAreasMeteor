var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.plantsareaItem.helpers({

    ownPost: function () {
        var user = Session.get("UserNET");
        return user && this.userId == user._id;
    },

    lastDate: function () {
        return this.lastDate ? this.lastDate : new Date().toISOString();
    },

    image: function () {
        var imageName = this.name.replace(/\s+/g, '') + '.jpg';
        var clientPath = '/pictures/' + imageName.toLowerCase();
        Meteor.call('getImage', this.img, imageName, this._id, function (err) {
            if (err) {
                Errors.throw("Cannot read files from directory");
            }
        });
        return clientPath;
        //return '/pictures/plant.jpg';
        //var u8 = new Uint8Array(atob(this.img).split("").map(function(c) {
        //    return c.charCodeAt(0);
        //}));
        //
        //return u8;
        //return '';
        //if (arr.length == 0) {
        //    Meteor.call('getFiles', 'C:/Users/Alex/WebstormProjects/PlantsAreas/public/pictures', function (err, res) {
        //        if(err) {
        //            Errors.throw("Cannot read files from directory");
        //        }
        //        arr = res;
        //        for (var i=0; i<arr.length; i++) {
        //            if (this.name.contains(arr[i])) {
        //                return "/" + arr[i];
        //            }
        //        }
        //        return "/pictures/plant.jpg";
        //    });
        //}
    },

    //numberOfSensors: function() {
    //  return Sensors.find({plantsareaId: this._id}).count();
    //},
    //upvotedClass: function() {
    //    var userId = Meteor.userId();
    //    if (userId && !_.include(this.upvoters, userId)) {
    //        return 'btn-primary upvotable';
    //    } else {
    //        return 'disabled';
    //    }
    //},

    attributes: function () {
        var plantsarea = _.extend({}, Positions.findOne({plantsareaId: this._id}), this);
        var newPosition = plantsarea._rank * POST_HEIGHT;
        var attributes = {};
        if (_.isUndefined(plantsarea.position)) {
            attributes.class = 'post invisible';
        } else {
            var offset = plantsarea.position - newPosition;
            attributes.style = "top: " + offset + "px";
            if (offset === 0)
                attributes.class = "post animate"
        }
        Meteor.setTimeout(function () {
            Positions.upsert({plantsareaId: plantsarea._id}, {$set: {position: newPosition}})
        });
        return attributes;
    }
});

//Template.postItem.events({
//
//    'click .upvotable': function(e) {
//        e.preventDefault();
//        Meteor.call('upvote', this._id);
//    }
//});