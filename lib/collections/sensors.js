Sensors = new Mongo.Collection('sensors');
SensorResourcesDir = 'C:/Users/Alex/WebstormProjects/PlantsAreas/public/pictures/sensors/';

if (Meteor.isServer) {
    var fs = Npm.require("fs");
    //var Base64encoding = require("./Base64encoding");
    var base64 = new Base64encoding();
}

var checkSensor = function(sensor) {
    try {
        check(sensor.measurableType, String);
        check(sensor.measuringTimeout, String);
        check(sensor.isCustom, String);
        check(sensor.isOn, String);
        if (sensor.plantsareaId) {
            check(sensor.plantsareaId, String);
        }
        if (sensor.dateTime) {
            check(sensor.dateTime, Date);
        }
    } catch(e){
        return false;
    }
    return true;
};

var getDefaultSensorImage = function(measurableType) {
    var arr  = fs.readdirSync(SensorResourcesDir);
    for (var i = 0; i < arr.length; i++) {
        if (measurableType.toLowerCase().indexOf(arr[i].toLowerCase().split('.')[0]) != -1) {
            return base64.base64_encode(SensorResourcesDir + arr[i]);
        }
    }
    return base64.base64_encode(SensorResourcesDir + 'sensor.png');
};


Meteor.methods({

    getSensorImage: function (img, imageName, sensorId) {
        if (img) {
            base64.base64_decode(img, SensorResourcesDir + 'session/' + imageName);
            return;
        }
        var base64str = getDefaultSensorImage(imageName);
        Sensors.update({_id: sensorId}, {$set: {img: base64str}});
        base64.base64_decode(base64str, SensorResourcesDir + 'session/' + imageName);
    },

    sensorInsert: function (sensor) {

        if (!checkSensor(sensor)){
            return false;
        }

        var sensorWithSameMeasurableType = Sensors.findOne({measurableType: sensor.measurableType});

        if (sensorWithSameMeasurableType && sensorWithSameMeasurableType.plantsareaId == sensor.plantsareaId) {
            return { sensorExists: true };
        }

        sensor.img = getDefaultSensorImage(sensor.measurableType.replace(/\s+/g, '') + '.png');

        var sensorId = Sensors.insert(sensor);
        PlantsAreas.update({_id: sensor.plantsareaId}, {$inc: {numberOfSensors: 1}, $set: {lastDate: sensor.dateTime}});

        //Sensors.update({_id: sensorId}, {$set: {name: name, img: base64str}});
    },

    sensorUpdate: function (sensor, sensorId) {

        if (!checkSensor(sensor)){
            return false;
        }

        var sensorWithSameType = Sensors.findOne({measurableType: sensor.measurableType});

        if (sensorWithSameType && sensorWithSameType._id !== sensorId) {
            return { sensorExists: true };
        }

        Sensors.update({_id: sensorId}, {
            $set : {
                measurableType: sensor.measurableType,
                measuringTimeout: sensor.measuringTimeout,
                isCustom: sensor.isCustom,
                isOn: sensor.isOn,
                dateTime: new Date(),
                img: getDefaultSensorImage(sensor.measurableType.replace(/\s+/g, '') + '.png')
            }
        });

        PlantsAreas.update({_id: sensor.plantsareaId}, {$set: {lastDate: new Date()}});
    },

    sensorRemove: function(sensorId, plantsareaId) {
        Sensors.remove(sensorId);
        PlantsAreas.update({_id: plantsareaId}, {$inc: {numberOfSensors: -1}});
    }
});

