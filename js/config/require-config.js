define(function () {
    "use strict";
    
    function isLessThanIE9 () {
        var myNav = navigator.userAgent.toLowerCase();
        if(myNav.indexOf('msie') !== -1){
            var ieVersion = parseInt(myNav.split('msie')[1], 10);
            if(ieVersion < 9)
                return true;
        }
        return false;
    }
    
    
    var requireConfig = {
        paths: {
            // vendor
            "text": "libs/require/text",
            "json": "libs/require/json",
            "jquery": isLessThanIE9() ? "libs/jquery/jquery-ie.min" : "libs/jquery/jquery.min",
            "underscore": "libs/underscore/underscore.min",
            "underscore.string": "libs/underscore/underscore.string.min",
            "backbone": "libs/backbone/backbone.min",
            "babysitter": "libs/backbone/backbone.babysitter.min",
            "wreqr": "libs/backbone/backbone.wreqr.min",
            "marionette": "libs/backbone/backbone.marionette.min",
            "bootstrap": "libs/bootstrap/bootstrap.min",
            // short form 
            "enums": "config/enums",
            "config": "config/config",
            "utils": "utility/utils",
            "template-helpers": "utility/template-helpers"
        },
        shim: {
            "underscore.string": {
                deps: ["underscore"],
                exports: "_.str"
            },
            "backbone": {
                deps: ["underscore", "jquery"],
                exports: "Backbone"
            },
            "babysitter": {
                deps: ["backbone"],
                exports: "Backbone.ChildViewContainer"
            },
            "wreqr": {
                deps: ["backbone"],
                exports: "Backbone.Wreqr"
            },
            "marionette": {
                deps: ["jquery", "backbone", "babysitter", "wreqr"],
                exports: "Marionette",
                init: function () {
                    Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
                        // Marionette expects "templateId" to be the ID of a DOM element.
                        // But with RequireJS, templateId is actually the full text of the template.
                        var msg;
                        var err;
                        var template = templateId;

                        // Make sure we have a template before trying to compile it
                        if (!template || template.length === 0) {
                            msg = "Could not find template: '" + templateId + "'";
                            err = new Error(msg);
                            err.name = "NoTemplateError";
                            throw err;
                        }
                        return template;
                    };
                }
            },
            "bootstrap": ["jquery"]
        },
        deps: ["bootstrap"],
        urlArgs: "v=0.0.1"
    };
    
    return requireConfig;
});
