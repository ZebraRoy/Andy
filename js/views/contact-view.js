define([
    "underscore",
    "marionette",
    "text!templates/contact-tmpl.html"
], function (_, Marionette, tmpl) {
    "use strict";
    
    var ContactView = Marionette.ItemView.extend({
        template: tmpl
    });
    
    return ContactView;
})