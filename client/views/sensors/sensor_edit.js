Template.sensorEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var measurableType = $(e.target).find('[name=measurableType]');
        var measuringTimeout = $(e.target).find('[name=measuringTimeout]');
        var isOn = $(e.target).find('[name=isOn]');
        var isCustom = $(e.target).find('[name=isCustom]');
        var sensorId = this._id;

        var plantsareaId = Session.get("plantsareaId");

        var sensor = {
            measurableType: measurableType.val().toLowerCase(),
            measuringTimeout: measuringTimeout.val(),
            isCustom: $('#isCustom:checked').val(),
            isOn: $('#isOn:checked').val(),
            plantsareaId: plantsareaId
        };

        sensor.isCustom = (sensor.isCustom == "on").toString();
        sensor.isOn = (sensor.isOn == "on").toString();

        Meteor.call('sensorUpdate', sensor, sensorId, function(error, result) {
            if (error){
                Errors.throw(error.reason);
                return;
            }
            if (result.sensorExists) {
                Errors.throw('This measurable type has already been taken');
                return;
            }
        });
        Router.go('plantsareaPage', {_id: plantsareaId});
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this sensor?")) {
            var sensorId = this._id;
            Meteor.call('sensorRemove', sensorId, this.plantsareaId, function(error) {
                if (error) {
                    Errors.throw(error.reason);
                    return;
                }
            });
            var plantsareaIdStr = Session.get("plantsareaId");
            Router.go('plantsareaPage', {_id: plantsareaIdStr});
        }
    }
});

Template.sensorEdit.helpers({

    valueIsCustom: function() {
        return this.isCustom == "true" ? "checked" : "";
    },
    valueIsOn: function() {
        return this.isOn == "true" ? "checked" : "";
    }
});
