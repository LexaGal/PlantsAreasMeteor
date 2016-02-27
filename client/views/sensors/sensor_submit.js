Template.sensorSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var measurableType = $(e.target).find('[name=measurableType]');
        var measuringTimeout = $(e.target).find('[name=measuringTimeout]');
        var isOn = $(e.target).find('[name=isOn]');
        var isCustom = $(e.target).find('[name=isCustom]');

        var sensor = {
            measurableType: measurableType.val(),
            measuringTimeout: measuringTimeout.val(),
            isCustom: $('#isCustom:checked').val(),
            isOn: $('#isOn:checked').val(),
            plantsareaId: this._id,
            dateTime: new Date()
        };

        sensor.isCustom = (sensor.isCustom == "on").toString();
        sensor.isOn = (sensor.isOn == "on").toString();

        Meteor.call('sensorInsert', sensor, function(error, result) {
            if (error){
                Errors.throw(error.reason);
            }
            if (result.sensorExists) {
                Errors.throw('This measurable type has already been taken');
            }
        });
    },

    'click .addButton': function(e) {
        e.preventDefault();
        //$("#sensorSubmit").show();
        document.getElementById('sensorSubmit').style.visibility = 'visible';
        document.getElementById('addButton').style.visibility = 'collapse';
    },

    'click .closeButton': function(e) {
        e.preventDefault();
        //$("#sensorSubmit").hide();
        document.getElementById('sensorSubmit').style.visibility = 'collapse';
        document.getElementById('addButton').style.visibility = 'visible';
    }
});