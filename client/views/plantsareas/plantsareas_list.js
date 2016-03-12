Template.plantsareasList.helpers({

    user: function () {
        return Session.get("UserNET");
    },

    plantsareasWithRank: function () {
        this.plantsareas.rewind();
        return this.plantsareas.map(function (plantsarea, index, cursor) {
            plantsarea._rank = index;
            return plantsarea;
        });
    }
});