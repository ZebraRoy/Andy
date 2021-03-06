define([
    "underscore",
    "marionette",
    "json!app-data/book.json",
    "text!templates/chapter-tmpl.html"
], function (_, Marionette, bookData, tmpl) {
    "use strict";
    
    var ChapterView = Marionette.ItemView.extend({
        template: tmpl,
        events: {
            "click [menu-trigger]": "onToggleMenu"
        },
        serializeData: function () {
            var name = this.options.name;
            var volumeInfo =  _(bookData[name].volumes).findWhere({ volume: this.options.volume });
            var chapters = volumeInfo.chapters;
            var chapterName = chapters[this.options.chapter]
            
            var nextChapterVolume = this.options.volume;
            var previousChapterVolume = this.options.volume;
            
            var nextChapter;
            var previousChapter;
            
            var isNextChapter = false;
            var isPreviousChapter = false;
            
            if ((this.options.chapter + 1) < chapters.length) {
                nextChapter = this.options.chapter + 1;
                isNextChapter = true;
            }
            else {
                var nextVolume = _(bookData[name].volumes).findWhere({ volume: this.options.volume + 1 });
                if (nextVolume && nextVolume.chapters.length > 0) {
                    nextChapterVolume = this.options.volume + 1;
                    nextChapter = 0;
                    isNextChapter = true;
                }
            }
            
            if (this.options.chapter - 1 >= 0) {
                previousChapter = this.options.chapter - 1;
                isPreviousChapter = true;
            }
            else {
                var previousVolume = _(bookData[name].volumes).findWhere({ volume: this.options.volume - 1 });
                if (previousVolume && previousVolume.chapters.length > 0) {
                    previousChapter = 0;
                    previousChapterVolume = this.options.volume - 1;
                    isPreviousChapter = true;
                }
            }
            
            return _({
                _: _,
                bookData: bookData,
                chapterName: chapterName,
                isNextChapter: isNextChapter,
                isPreviousChapter: isPreviousChapter,
                nextChapter: nextChapter,
                nextChapterVolume: nextChapterVolume,
                previousChapter: previousChapter,
                previousChapterVolume: previousChapterVolume
            }).extend(this.options);
        },
        onRender: function () {
            $("body").scrollTop(0);
        },
        onToggleMenu: function () {
            this.$("footer").toggleClass("active");
            this.$("[menu-trigger] .fa").toggleClass("fa-chevron-up fa-chevron-down");
        }
    });
    
    return ChapterView;
});