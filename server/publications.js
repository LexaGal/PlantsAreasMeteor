/**
 * Created by Alex on 1/5/2016.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});