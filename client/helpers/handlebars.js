UI.registerHelper('pluralize', function(n, thing) {
    // простой как барабан pluralizer
    if (n === 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});
