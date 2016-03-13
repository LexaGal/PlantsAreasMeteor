Template.plantsareaPage.helpers({
    sensors: function() {
        return Sensors.find({plantsareaId: this._id});
    },

    plantsareaItems: function() {
        return PlantsAreas.find({_id: this._id});
    },

    currentUser: function() {
        return Session.get("UserNET") != null;
    }
});