// Fixture data
if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    // create two users
    var tomId = Meteor.users.insert({
        profile: { first_name: 'Tom',  last_name: 'Coleman' }
    });
    var tom = Meteor.users.findOne(tomId);
    var sachaId = Meteor.users.insert({
        profile: { first_name: 'Sacha', last_name: 'Greif' }
    });
    var sacha = Meteor.users.findOne(sachaId);

    var telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sacha._id,
        author: sacha.profile.first_name.concat(" ").concat(sacha.profile.last_name),
        url: 'http://sachagreif.com/introducing-telescope/',
        submitted: now - 7 * 3600 * 1000
    });

    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.first_name.concat(" ").concat(tom.profile.last_name),
        submitted: now - 5 * 3600 * 1000,
        body: 'Interesting project Sacha, can I get involved?'
    });

    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.profile.first_name.concat(" ").concat(sacha.profile.last_name),
        submitted: now - 3 * 3600 * 1000,
        body: 'You sure can Tom!'
    });

    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.first_name.concat(" ").concat(tom.profile.last_name),
        url: 'http://meteor.com',
        submitted: now - 10 * 3600 * 1000
    });

    Posts.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.profile.first_name.concat(" ").concat(tom.profile.last_name),
        url: 'http://themeteorbook.com',
        submitted: now - 12 * 3600 * 1000
    });
}