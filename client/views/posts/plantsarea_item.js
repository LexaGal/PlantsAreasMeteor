var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);
Template.plantsareaItem.helpers({

    ownPost: function () {
        return Meteor.user() && this.userId == Meteor.userId();
    },

    //upvotedClass: function() {
    //    var userId = Meteor.userId();
    //    if (userId && !_.include(this.upvoters, userId)) {
    //        return 'btn-primary upvotable';
    //    } else {
    //        return 'disabled';
    //    }
    //},

    attributes: function() {
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
        Meteor.setTimeout(function() {
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