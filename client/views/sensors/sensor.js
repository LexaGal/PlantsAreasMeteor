//Template.sensor.helpers({
//    messages: function() {
//        return Messages.find({measurableType: this.measurableType, read: false});
//    }
//});

Template.sensor.helpers({

    image: function () {
        var imageName = this.measurableType.replace(/\s+/g, '').toLowerCase() + '.png';
        var clientPath = '/pictures/sensors/';
        Meteor.call('getSensorImage', this.img, imageName, this._id, function (err, link) {
            if (err) {
                Errors.throw("Cannot read files from directory");
            }
            Session.set(imageName, link);
        });
        var resImg = Session.get(imageName);
        if (resImg) {
            return clientPath + resImg;
        }
        return clientPath + 'sensor.png';
    }
});