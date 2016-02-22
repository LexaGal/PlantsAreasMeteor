$.validator.addMethod( 'plantsareaUnique', (name) => {
    var exists = PlantsAreas.findOne( { name: name } );
    return exists ? false : true;
});
