require([
    "config/require-config"
], function (requireConfig) {
    "use strict";
    
    require.config(requireConfig);
    require([
        "jquery",
        "applications/app"
    ], function ($, app) {
        $(document).ready(function () {
            app.start();
        });
    });
});
