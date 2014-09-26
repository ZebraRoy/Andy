define([
    "underscore",
    "marionette",
    "text!templates/links-tmpl.html"
], function (_, Marionette, tmpl) {
    "use strict";
    
    var LinksView = Marionette.ItemView.extend({
        template: tmpl
    });
    
    return LinksView;
})