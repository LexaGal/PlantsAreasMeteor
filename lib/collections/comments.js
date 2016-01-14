Comments = new Mongo.Collection('comments');

Meteor.methods({
    comment: function(commentAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        // ensure the user is logged in
        if (!user)
                Errors.throw("You need to login to make comments");
        if (!commentAttributes.body)
                Errors.throw('Please write some content');
        if (!post)
                Errors.throw('You must comment on a post');
        comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
            userId: user._id,
            author: user.services.google ? user.profile.name : user.profile.first_name.concat(" ").concat(user.profile.last_name),
            submitted: new Date().getTime()
        });
        // update the post with the number of comments
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        // создаем комментарий и сохраняем id
        comment._id = Comments.insert(comment);
        // создаем уведомление, информируя пользователя о новом комментарии
        createCommentNotification(comment);
        return comment._id;
    }
});