Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc) {
        // разрешить постить только если пользователь залогинен
        return !! userId;
    }
});