Posts = new Mongo.Collection('posts');

// проверяем что userId на самом деле автор данного документа
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // разрешаем редактировать только следующие два поля:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({

    //post: function(postAttributes) {
    //    // […]
    //
    //    // выбираем нужные поля для публикации
    //    var post = _.extend(_.pick(postAttributes, 'url', 'message'), {
    //        title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
    //        userId: Meteor.user()._id,
    //        author: Meteor.user().username,
    //        submitted: new Date().getTime()
    //    });
    //
    //    // ждем 5 секунд
    //    if (! this.isSimulation) {
    //        var Future = Npm.require('fibers/future');
    //        var future = new Future();
    //        Meteor.setTimeout(function() {
    //            future.return();
    //        }, 5 * 1000);
    //        future.wait();
    //    }
    //    var postId = Posts.insert(post);
    //
    //    return postId;
    //},

    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.services.google ? user.profile.name : user.profile.first_name.concat(" ").concat(user.profile.last_name),
            submitted: new Date(),
            commentsCount : 0,
            upvoters: [],
            votes: 0});

        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    },

    upvote: function(postId) {
        var user = Meteor.user();
        // удостоверимся, что пользователь залогинен
        if (!user)
            Errors.throw("Надо залогиниться чтобы голосовать");
        //var post = Posts.findOne(postId);
        //if (!post)
        //    Errors.throw("Пост не найден");
        //if (_.include(post.upvoters, user._id))
        //    Errors.throw("Вы уже голосовали за этот пост");
        //Posts.update(post._id, {
        //    $addToSet: {upvoters: user._id},
        //    $inc: {votes: 1}
        //});

        Posts.update({
            _id: postId,
            upvoters: {$ne: user._id}
        }, {
            $addToSet: {upvoters: user._id},
            $inc: {votes: 1}
        });
    }
});