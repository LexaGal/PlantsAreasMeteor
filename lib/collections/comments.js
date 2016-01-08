Comments = new Meteor.Collection('comments');

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
            author: user.profile.first_name.concat(" ").concat(user.profile.last_name),
            submitted: new Date().getTime()
        });
        // update the post with the number of comments
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        return Comments.insert(comment);
    }
});