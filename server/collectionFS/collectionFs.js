//var FS = require("collectionFS");
var keysDropbox = {
    key: "27wrepzvuttr3y0",
    secret: "awygdzgr53kukbi",
    token: "F5BIk0TOHjgAAAAAAAAERmKho3w8LEmGijfJQPI1B7BSZpkskV8Zvvva9nYrpZEY"
};
//transformWrite: function(fileObj, readStream, writeStream) {
//    gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream)
//}
//});
// {
//key: "KEY-HERE",
//secret: "SECRET-KEY-HERE",
//token: "TOKEN-HERE",
//beforeWrite: function(fileObj) {
//    fileObj.size(20, {store: "avatarStoreSmall", save: false});
//},
//transformWrite: function(fileObj, readStream, writeStream) {
//    gm(readStream, fileObj.name()).resize('20', '20').stream().pipe(writeStream)
//}
//})
var plantsareasStore = new FS.Store.Dropbox("plantsareas", keysDropbox);
var sensorsStore = new FS.Store.Dropbox("sensors", keysDropbox);

Avatars = new FS.Collection("images", {
    stores: [plantsareasStore, sensorsStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});