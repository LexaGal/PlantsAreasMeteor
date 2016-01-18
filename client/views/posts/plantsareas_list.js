Template.plantsareasList.helpers({

    plantsareasWithRank: function () {
            this.plantsareas.rewind();
            return this.plantsareas.map(function (plantsarea, index, cursor) {
                plantsarea._rank = index;
                return plantsarea;
            });
    }
});