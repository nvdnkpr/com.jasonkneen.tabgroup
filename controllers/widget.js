// __parentSymbol is the host window
var tabs = Widget.createWidget(Widget.widgetId, "tabs", __parentSymbol);

tabs.init();

exports.addTab = tabs.addTab;
exports.open = tabs.open;
exports.set = tabs.set; 