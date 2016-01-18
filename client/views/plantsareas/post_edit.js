//Template.postEdit.events({
//    'submit form': function (e) {
//        e.preventDefault();
//
//        var currentPostId = this._id;
//
//        var postAttributes = {
//            url: $(e.target).find('[name=url]').val(),
//            title: $(e.target).find('[name=title]').val()
//        };
//
//        var postWithSameLink = Posts.findOne({url: postAttributes.url});
//
//        if (postWithSameLink && postWithSameLink._id !== currentPostId) {
//            Errors.throw('This link has already been posted');
//            Router.go('postPage', {_id: postWithSameLink._id});
//            return;
//        }
//
//        Posts.update(currentPostId, {$set: postAttributes}, function (error) {
//            if (error) {
//                // display the error to the user
//                Errors.throw(error.reason);
//            } else {
//                Router.go('postPage', {_id: currentPostId});
//            }
//        });
//    },
//
//    'click .delete': function (e) {
//        e.preventDefault();
//
//        if (confirm("Delete this post?")) {
//            var currentPostId = this._id;
//            Posts.remove(currentPostId);
//            Router.go('home');
//        }
//    }
//});