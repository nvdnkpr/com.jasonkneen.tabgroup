// __parentSymbol is the host window
var tabs = Widget.createWidget(Widget.widgetId, "tabs", __parentSymbol);

tabs.init();

exports.addTab = tabs.addTab;
exports.open = tabs.open;
exports.configure = tabs.configure; 
exports.getActiveTab = tabs.getActiveTab;
exports.setActiveTab = tabs.setActiveTab;

Object.defineProperty($, "activeTab", {
    get : tabs.getActiveTab,
    set : tabs.setActiveTab 
});
