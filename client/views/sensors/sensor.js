//Template.sensor.helpers({
//    messages: function() {
//        return Messages.find({measurableType: this.measurableType, read: false});
//    }
//});

Template.sensor.helpers({

    image: function () {
        var imageName = this.measurableType.replace(/\s+/g, '') + '.png';
        var clientPath = '/pictures/sensors/session/' + imageName.toLowerCase();
        Meteor.call('getSensorImage', this.img, imageName, this._id, function (err) {
            if (err) {
                Errors.throw("Cannot read files from directory");
            }
        });
        return clientPath;
    }
});