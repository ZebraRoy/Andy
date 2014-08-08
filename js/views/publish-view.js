define([
    "underscore",
    "marionette",
    "json!app-data/publish.json",
    "text!templates/publish-tmpl.html"
], function (_, Marionette, publishData, tmpl) {
    "use strict";
    
    var PublishView = Marionette.ItemView.extend({
        template: tmpl,
        templateHelper: {
            _: _
        },
        serializeData: function () {
            return publishData;
        }
    });
    
    return PublishView;
})