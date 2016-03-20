var plantsareasStore = new FS.Store.Dropbox("plantsareas");
var sensorsStore = new FS.Store.Dropbox("sensors");

Avatars = new FS.Collection("images", {
    stores: [plantsareasStore, sensorsStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});