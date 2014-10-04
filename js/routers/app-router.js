define([
    "marionette",
    "jquery",
    "utils"
], function (Marionette, $, utils) {
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
            "links": "onShowLinks",
            "contact": "onShowContact",
            "*actions": "onShowNews"
        },
        onShowNews: function () {
            var that = this;
            require([
                "views/news-view"
            ], function (NewsView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new NewsView());
            });
        },
        onShowAbout: function () {
            var that = this;
            require([
                "views/about-view"
            ], function (AboutView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new AboutView());
            });
        },
        onShowIndexes: function () {
            var that = this;
            require([
                "views/indexes-view"
            ], function (IndexesView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new IndexesView());
            });
        },
        onShowNovelDetail: function (name) {
            var that = this;
            require([
                "views/detail-view"
            ], function (DetailView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new DetailView({
                    name: name
                }));
            });
        },
        onReadChapter: function (name, volume, chapter) {
            var that = this;
            utils.blockUI();
            require([
                "jquery",
                "views/chapter-view",
                "text!books/" + [name, volume].join("_") + ".xml"
            ], function ($, ChapterView, bookData) {
                utils.unblockUI();
                $(".navbar-collapse.collapse").removeClass("in");
                var $xml = $($.parseXML(bookData));
                var chapters = [];
                $xml.find("CHAPTER").each(function () {
                    var content = $(this).html();
                    content = content.replace(/<!--\[CDATA\[/, "");
                    content = content.replace(/\]\]>/, "");
                    chapters.push(content);
                });
                
                that.app.main.close();
                that.app.main.show(new ChapterView({
                    name: name,
                    volume: Number(volume),
                    chapter: Number(chapter),
                    content: chapters[chapter]
                }));
            });
        },
        onShowPublish: function () {
            var that = this;
            require([
                "views/publish-view"
            ], function (PublishView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new PublishView());
            });
        },
        onShowLinks: function () {
            var that = this;
            require([
                "views/links-view"
            ], function (LinksView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new LinksView());
            });
        },
        onShowContact: function () {
            var that = this;
            require([
                "views/contact-view"
            ], function (ContactView) {
                $(".navbar-collapse.collapse").removeClass("in");
                that.app.main.show(new ContactView());
            });
        }
    });
    
    return AppRouter;
});