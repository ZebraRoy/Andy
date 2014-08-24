define([
    "underscore",
    "marionette",
    "json!app-data/indexes.json",
    "text!templates/detail-tmpl.html"
], function (_, Marionette, indexesData, tmpl) {
    "use strict";
    
    var DetailView = Marionette.ItemView.extend({
        template: tmpl,
        serializeData: function () {
            var name = this.options.name;
            var noval = _(indexesData.finished).findWhere({
                name: name
            });
            if (!noval) {
                noval = _(indexesData.writing).findWhere({
                    name: name
                });
            }
            if (!noval) {
                noval = _(indexesData.submiting).findWhere({
                    name: name
                });
            }
            if (!noval) {
                noval = _(indexesData.pending).findWhere({
                    name: name
                });
            }
            return noval;
        }
    });
    
    return DetailView;
});