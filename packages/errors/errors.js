Errors = {
    // Локальная (только для клиента) коллекция
    collection: new Meteor.Collection(null),

    throw: function(message) {
        Errors.collection.insert({message: message, seen: false})
    },
    clearSeen: function() {
        Errors.collection.remove({seen: true});
    }
};
