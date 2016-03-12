Template.plantsareaEdit.onRendered( function() {
    $( "#plantsareaEditForm" ).validate({
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

Template.plantsareaEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var plantsareaId = this._id;

        var plantsarea = {
            name: $(e.target).find('[name=name_plantsareaItem]').val()
        };

        Meteor.call('plantsareaUpdate', plantsarea.name.toLowerCase(), plantsareaId, function(error, result) {
            if (error) {
                Errors.throw(error.reason);
                return;
            }
            if (result.plantsareaExists) {
                Errors.throw('This name has already been taken');
            }
        });
        Router.go('plantsareaPage', {_id: plantsareaId});
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this plantsarea?")) {
            var plantsareaId = this._id;
            Meteor.call('plantsareaRemove', plantsareaId,  function(error) {
                if (error) {
                    Errors.throw(error.reason);
                }
            });
            Router.go('home');
        }
    }
});