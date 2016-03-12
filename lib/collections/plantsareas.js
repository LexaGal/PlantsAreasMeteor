PlantsAreas = new Mongo.Collection('plantsareas');
ResourcesDir = 'C:/Users/Alex/WebstormProjects/PlantsAreas/public/pictures/';

if (Meteor.isServer) {
    var fs = Npm.require("fs");
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

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
}

var getDefaultPlantsareaImage = function(plantsareaName) {
    var arr  = fs.readdirSync(ResourcesDir);
    for (var i = 0; i < arr.length; i++) {
        if (plantsareaName.indexOf(arr[i].toLowerCase().split('.')[0]) != -1) {
            return base64_encode(ResourcesDir + arr[i]);
        }
    }
    return base64_encode(ResourcesDir + 'plant.jpg');
};

Meteor.methods({

    getImage: function (img, imageName, plantsareaId) {
        if (img) {
            base64_decode(img, ResourcesDir + imageName);
            return;
        }
        var base64str = getDefaultPlantsareaImage(imageName);
        PlantsAreas.update({_id: plantsareaId}, {$set: {img: base64str}});
        base64_decode(base64str, ResourcesDir + imageName);
    },

    plantsareaInsert: function (name, userId) {
        check(name, String);
        check(userId, String);

        var plantsarea = {
            userId: userId,
            numberOfSensors: 0,
            name: name,
            dateTime: new Date().toISOString()
        };

        var plantsareaId = PlantsAreas.insert(plantsarea);

        var base64str = getDefaultPlantsareaImage(plantsarea.name.replace(/\s+/g, '') + '.jpg');
        PlantsAreas.update({_id: plantsareaId}, {$set: {name: name, img: base64str}});
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