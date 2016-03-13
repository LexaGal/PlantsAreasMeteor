PlantsAreas = new Mongo.Collection('plantsareas');
PlantsareaResourcesDir = 'C:/Users/Alex/WebstormProjects/PlantsAreas/public/pictures/plantsareas/';

if (Meteor.isServer) {
    var fs = Npm.require("fs");
    //var Base64encoding = require("./Base64encoding");
    var base64 = new Base64encoding();
}

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

var getDefaultPlantsareaImage = function(plantsareaName) {
    var arr  = fs.readdirSync(PlantsareaResourcesDir);
    for (var i = 0; i < arr.length; i++) {
        if (plantsareaName.toLowerCase().indexOf(arr[i].toLowerCase().split('.')[0]) != -1) {
            return base64.base64_encode(PlantsareaResourcesDir + arr[i]);
        }
    }
    return base64.base64_encode(PlantsareaResourcesDir + 'plant.jpg');
};

Meteor.methods({

    getPlantsareaImage: function (img, imageName, plantsareaId) {
        if (img) {
            base64.base64_decode(img, PlantsareaResourcesDir + 'session/' + imageName);
            return;
        }
        var base64str = getDefaultPlantsareaImage(imageName);
        PlantsAreas.update({_id: plantsareaId}, {$set: {img: base64str}});
        base64.base64_decode(base64str, PlantsareaResourcesDir + 'session/' + imageName);
    },

    plantsareaInsert: function (name, userId) {
        check(name, String);
        check(userId, String);

        var plantsarea = {
            userId: userId,
            numberOfSensors: 0,
            name: name,
            dateTime: new Date().toISOString(),
            img: getDefaultPlantsareaImage(name.replace(/\s+/g, '') + '.jpg')
        };

        var plantsareaId = PlantsAreas.insert(plantsarea);
        //PlantsAreas.update({_id: plantsareaId}, {$set: {img: base64str}});
    },

    plantsareaUpdate: function (name, plantsareaId) {
        check(name, String);
        check(plantsareaId, String);

        var plantsareaWithSameName = PlantsAreas.findOne({name: name});

        if (plantsareaWithSameName && plantsareaWithSameName._id !== plantsareaId) {
            return {plantsareaExists: true};
        }

        var base64str = getDefaultPlantsareaImage(name.replace(/\s+/g, '') + '.jpg');
        PlantsAreas.update({_id: plantsareaId}, {$set: {name: name, img: base64str}});
    },

    plantsareaRemove: function (plantsareaId) {
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