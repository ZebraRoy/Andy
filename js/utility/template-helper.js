define([
    "underscore",
    "underscore.string",
    "utils",
    "config",
    "enums"
], function (_, _s, utils, config, enums) {
    "use strict";
    
    var templateHelpers = {
        _: _,
        _s: _s,
        utils: utils,
        config: config,
        enums: enums
    };
    
    return templateHelpers;
});
