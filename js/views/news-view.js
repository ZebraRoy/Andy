define([
    "marionette",
    "json!app-data/news.json",
    "text!templates/news-tmpl.html"
], function (Marionette, newsData, tmpl) {
    "use strict";
    
    var NewsView = Marionette.ItemView.extend({
        template: tmpl,
        serializeData: function () {
            return {
                news: newsData
            };
        }
    });
    
    return NewsView;
});