define([
    "underscore",
    "marionette",
    "json!app-data/book.json",
    "text!templates/chapter-tmpl.html"
], function (_, Marionette, bookData, tmpl) {
    "use strict";
    
    var ChapterView = Marionette.ItemView.extend({
        template: tmpl,
        serializeData: function () {
            var name = this.options.name;
            var volumeInfo =  _(bookData[name].volumes).findWhere({ volume: this.options.volume })
            var chapterName = _(volumeInfo.chapters)
                .findWhere({ chapter: Number(this.options.chapter )})
                .name;
            
            var nextChapterVolume = this.options.volume;
            var previousChapterVolume = this.options.volume;
            
            var nextChapter = _(volumeInfo.chapters).findWhere({ chapter: this.options.chapter + 1 });
            var previousChapter = _(volumeInfo.chapters).findWhere({ chapter: this.options.chapter - 1 });
            
            if (!nextChapter) {
                var nextVolume = _(bookData[name].volumes).findWhere({ volume: this.options.volume + 1 });
                if (nextVolume && nextVolume.chapters.length > 0) {
                    nextChapter = nextVolume.chapters[0];
                    nextChapterVolume = this.options.volume + 1;
                }
            }
            
            if (!previousChapter) {
                var previousVolume = _(bookData[name].volumes).findWhere({ volume: this.options.volume - 1 });
                if (previousVolume && previousVolume.chapters.length > 0) {
                    previousChapter = previousVolume.chapters[0];
                    previousChapterVolume = this.options.volume - 1;
                }
            }
            
            var isNextChapter = !!nextChapter;
            var isPreviousChapter = !!previousChapter;
            
            return _({
                _: _,
                chapterName: chapterName,
                isNextChapter: isNextChapter,
                isPreviousChapter: isPreviousChapter,
                nextChapter: nextChapter ? nextChapter.chapter : 0,
                nextChapterVolume: nextChapterVolume,
                previousChapter: previousChapter ? previousChapter.chapter : 0,
                previousChapterVolume: previousChapterVolume
            }).extend(this.options);
        }
    });
    
    return ChapterView;
});