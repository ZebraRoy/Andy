define([
    "marionette"
], function (Marionette) {
    "use strict";
    
    var AppRouter = Marionette.AppRouter.extend({
        initialize: function (options) {
            this.app = options.app;
        },
        routes: {
            "about": "onShowAbout",
            "publish": "onShowPublish",
            "*actions": "onShowNews"
        },
        onShowNews: function () {
            var that = this;
            require([
                "views/news-view"
            ], function (NewsView) {
                that.app.main.show(new NewsView());
            });
        },
        onShowAbout: function () {
            var that = this;
            require([
                "views/about-view"
            ], function (AboutView) {
                that.app.main.show(new AboutView());
            });
        },
        onShowPublish: function () {
            var that = this;
            require([
                "views/publish-view"
            ], function (PublishView) {
                that.app.main.show(new PublishView());
            });
        }
    });
    
    return AppRouter;
});