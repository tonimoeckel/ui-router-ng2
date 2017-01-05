"use strict";
var ui_router_core_1 = require("ui-router-core");
var ui_router_core_2 = require("ui-router-core");
var ui_router_core_3 = require("ui-router-core");
/**
 * This is a [[StateBuilder.builder]] function for angular2 `views`.
 *
 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
 * handles the `views` property with logic specific to ui-router-ng2.
 *
 * If no `views: {}` property exists on the [[StateDeclaration]], then it creates the `views` object and
 * applies the state-level configuration to a view named `$default`.
 */
function ng2ViewsBuilder(state) {
    var views = {}, viewsObject = state.views || { "$default": ui_router_core_1.pick(state, "component") };
    ui_router_core_1.forEach(viewsObject, function (config, name) {
        name = name || "$default"; // Account for views: { "": { template... } }
        if (Object.keys(config).length == 0)
            return;
        config.$type = "ng2";
        config.$context = state;
        config.$name = name;
        var normalized = ui_router_core_3.ViewService.normalizeUIViewTarget(config.$context, config.$name);
        config.$uiViewName = normalized.uiViewName;
        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
        views[name] = config;
    });
    return views;
}
exports.ng2ViewsBuilder = ng2ViewsBuilder;
var id = 0;
var Ng2ViewConfig = (function () {
    function Ng2ViewConfig(path, viewDecl) {
        this.path = path;
        this.viewDecl = viewDecl;
        this.$id = id++;
        this.loaded = true;
    }
    Ng2ViewConfig.prototype.load = function () {
        return ui_router_core_2.services.$q.when(this);
    };
    return Ng2ViewConfig;
}());
exports.Ng2ViewConfig = Ng2ViewConfig;
//# sourceMappingURL=views.js.map