define([
    "marionette",
    "json!app-data/indexes.json",
    "text!templates/indexes-tmpl.html"
], function (Marionette, indexesData, tmpl) {
    "use strict";
    
    var IndexesView = Marionette.ItemView.extend({
        template: tmpl,
        serializeData: function () {
            return {
                data: indexesData
            };
        }
    });
    
    return IndexesView;
});