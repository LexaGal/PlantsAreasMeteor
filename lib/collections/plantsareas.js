PlantsAreas = new Mongo.Collection('plantsareas');

// проверяем что userId на самом деле автор данного документа
//ownsDocument = function (doc) {
//    return doc && doc.userId === UserNET._id;
//};

//PlantsAreas.allow({
//    update: ownsDocument,
//    remove: ownsDocument,
//    insert: ownsDocument
//});

//PlantsAreas.deny({
//    update: function(userId, post, fieldNames) {
//        // разрешаем редактировать только следующие два поля:
//        return (_.without(fieldNames, 'url', 'title').length > 0);
//    }
//});

Meteor.methods({

    plantsareaInsert: function (name, userId) {
        check(name, String);
        check(userId, String);

        var plantsarea = {
            userId: userId,
            numberOfSensors: 0,
            name: name,
            dateTime: new Date().toISOString()
        };

        PlantsAreas.insert(plantsarea);
        //plantsarea = PlantsAreas.findOne({_id: plantsareaId});
        //return plantsarea;
    },

    plantsareaUpdate: function (name, plantsareaId) {
        check(name, String);
        check(plantsareaId, String);

        var plantsareaWithSameName = PlantsAreas.findOne({name: name});

        if (plantsareaWithSameName && plantsareaWithSameName._id !== plantsareaId) {
            return { plantsareaExists: true };
        }

        PlantsAreas.update({_id: plantsareaId}, {$set: {name: name}});
    },

    plantsareaRemove: function(plantsareaId) {
        PlantsAreas.remove(plantsareaId);
    }
});

//    upvote: function(postId) {
//        var user = Meteor.user();
//        // удостоверимся, что пользователь залогинен
//        if (!user)
//            Errors.throw("Надо залогиниться чтобы голосовать");
//        //var post = Posts.findOne(postId);
//        //if (!post)
//        //    Errors.throw("Пост не найден");
//        //if (_.include(post.upvoters, user._id))
//        //    Errors.throw("Вы уже голосовали за этот пост");
//        //Posts.update(post._id, {
//        //    $addToSet: {upvoters: user._id},
//        //    $inc: {votes: 1}
//        //});
//
//        Posts.update({
//            _id: postId,
//            upvoters: {$ne: user._id}
//        }, {
//            $addToSet: {upvoters: user._id},
//            $inc: {votes: 1}
//        });
//    }
//});