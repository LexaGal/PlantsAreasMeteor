// Локальная коллекция, доступна только на клиенте
Errors = new Meteor.Collection(null);

throwError = function(message) {
    Errors.insert({message: message, seen: false})
}

clearErrors = function() {
    Errors.remove({seen: true});
}