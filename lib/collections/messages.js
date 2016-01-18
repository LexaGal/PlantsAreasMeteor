Messages = new Mongo.Collection('messages');

//Messages.allow({
//    update: function(userId, doc, fieldNames) {
//        return ownsDocument(userId, doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
//    }
//});

Meteor.methods({
    updateMessage: function(messageId) {
        Messages.update(messageId, {$set: {read: "True"}});
    }
});

Meteor.methods({
    updateMessages: function(measurableType) {
        Messages.update({measurableType: measurableType}, {$set: {read: "True"}}, {multi:true});
    }
});
//createCommentNotification = function(comment) {
//    var post = PlantsAreas.findOne(comment.postId);
//    if (comment.userId !== post.userId) {
//        Notifications.insert({
//            userId: post.userId,
//            postId: post._id,
//            commentId: comment._id,
//            commenterName: comment.author,
//            read: false
//        });
//    }
//};
