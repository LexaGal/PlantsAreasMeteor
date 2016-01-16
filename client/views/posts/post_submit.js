//Template.postSubmit.events({
//    'submit form': function(e) {
//        e.preventDefault();
//
//        var post = {
//            url: $(e.target).find('[name=url]').val(),
//            title: $(e.target).find('[name=title]').val()
//        };
//
//        Meteor.call('postInsert', post, function (error, result) {
//
//            // отобразить ошибку пользователю и прерваться
//            if (result.postExists) {
//                Errors.throw('This link has already been posted');
//            }
//            Router.go('postPage', {_id: result._id});
//        })
//    }
//});
//
//    //for Simulation on '(client)' && '(server)'
//    //'submit form': function(event) {
//    //    event.preventDefault();
//    //
//    //    var post = {
//    //        url: $(event.target).find('[name=url]').val(),
//    //        title: $(event.target).find('[name=title]').val(),
//    //        message: $(event.target).find('[name=message]').val()
//    //    }
//    //
//    //    Meteor.call('post', post, function(error, id) {
//    //        if (error)
//    //            return alert(error.reason);
//    //    });
//    //    Router.go('postsList');
//    //}
////});