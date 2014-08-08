define([
    "marionette",
    "routers/app-router"
], function (Marionette, AppRouter) {
    "use strict";
    
    var app = new Marionette.Application();
    
    app.addRegions({
        main: "#main"
    });
    
    app.addInitializer(function () {
        new AppRouter({
            app: app
        });
        Backbone.history.start();
    });
    
    return app;
});