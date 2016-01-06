// Локальная коллекция, доступна только на клиенте
Errors = new Meteor.Collection(null);

throwError = function(message) {
    Errors.insert({message: message})
}