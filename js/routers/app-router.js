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
            "indexes": "onShowIndexes",
            "indexes/:name": "onShowNovelDetail",
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
        onShowIndexes: function () {
            var that = this;
            require([
                "views/indexes-view"
            ], function (IndexesView) {
                that.app.main.show(new IndexesView());
            });
        },
        onShowNovelDetail: function (name) {
            var that = this;
            require([
                "views/detail-view"
            ], function (DetailView) {
                that.app.main.show(new DetailView({
                    name: name
                }));
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