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
            "read/:name/:volume/:chapter": "onReadChapter",
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
        onReadChapter: function (name, volume, chapter) {
            var that = this;
            require([
                "jquery",
                "views/chapter-view",
                "text!books/" + [name, volume].join("_") + ".xml"
            ], function ($, ChapterView, bookData) {
                var $xml = $($.parseXML(bookData));
                var chapters = [];
                $xml.find("CHAPTER").each(function () {
                    var content = $(this).html();
                    content = content.replace(/<!--\[CDATA\[/, "");
                    content = content.replace(/\]\]>/, "");
                    chapters.push(content);
                });
                
                that.app.main.show(new ChapterView({
                    name: name,
                    volume: Number(volume),
                    chapter: Number(chapter),
                    content: chapters[chapter]
                }));
                
                $("body").scrollTop(0);
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