Sensors = new Mongo.Collection('sensors');

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

Meteor.methods({

    sensorInsert: function (sensor) {

        if (!checkSensor(sensor)){
            return false;
        }

        var sensorWithSameMeasurableType = Sensors.findOne({measurableType: sensor.measurableType});

        if (sensorWithSameMeasurableType && sensorWithSameMeasurableType.plantsareaId == sensor.plantsareaId) {
            return { sensorExists: true };
        }

        Sensors.insert(sensor);
        PlantsAreas.update({_id: sensor.plantsareaId}, {$inc: {numberOfSensors: 1}, $set: {lastDate: sensor.dateTime} });
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
                dateTime: new Date()
            }
        });

        //console.log(JSON.stringify(sensor));
        PlantsAreas.update({_id: sensor.plantsareaId}, {$set: {lastDate: new Date()}} );
        //console.log(sensor.plantsareaId);
    },

    sensorRemove: function(sensorId, plantsareaId) {
        Sensors.remove(sensorId);
        PlantsAreas.update({_id: plantsareaId}, {$inc: {numberOfSensors: -1}});
    }
});

