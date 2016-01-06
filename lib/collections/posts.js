Posts = new Mongo.Collection('posts');

Meteor.methods({
    post: function(postAttributes) {
        // […]

        // выбираем нужные поля для публикации
        var post = _.extend(_.pick(postAttributes, 'url', 'message'), {
            title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
            userId: Meteor.user()._id,
            author: Meteor.user().username,
            submitted: new Date().getTime()
        });

        // ждем 5 секунд
        if (! this.isSimulation) {
            var Future = Npm.require('fibers/future');
            var future = new Future();
            Meteor.setTimeout(function() {
                future.return();
            }, 5 * 1000);
            future.wait();
        }
        var postId = Posts.insert(post);

        return postId;
    },

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
            author: user.username,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});