Template.newPlantsareaItem.onRendered( function() {
    $( "#newPlantsareaItemForm" ).validate({
        rules: {
            name_plantsareaItem: {
                required: true,
                plantsareaUnique: true
            }
        },
        messages: {
            name_plantsareaItem: {
                required: "Need name here!",
                plantsareaUnique: "Plantsarea with that name already exists"
            }
        },
        highlight: function() {
            $("[id*='error']").addClass('validationError')
        }
    });
});

Template.newPlantsareaItem.events({

    'submit form': function (event) {
        event.preventDefault();

        var name = $(event.target).find('[name=name_plantsareaItem]').val();
        Meteor.call('plantsareaInsert', name, UserNET._id, function () {
            Router.go('plantsareasList');
        });
    }
});