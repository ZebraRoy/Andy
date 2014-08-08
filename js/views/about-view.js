define([
    "marionette",
    "json!app-data/about.json",
    "text!templates/about-tmpl.html"
], function (Marionette, aboutData, tmpl) {
    "use strict";
    
    var AboutView = Marionette.ItemView.extend({
        template: tmpl,
        serializeData: function () {
            return aboutData;
        }
    });
    
    return AboutView;
});