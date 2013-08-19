var rootWindow = arguments[0] || {};

var helpers = require(WPATH("helpers"));

var navGroup, activeTab, tabGroupWindow, tabs = [];

// defaults
var settings = {
	tabHeight : OS_IOS ? 49 : 69,
	tabsAtBottom : true,
	tabGroup : {},
	tabs : {}
};

// initialise the tabGroup Window
function init() {
    
	// hide the root window
	// before opening it
	rootWindow.visible = false;
	rootWindow.open();

	// create our tab window to hold the tabs
	tabGroupWindow = Ti.UI.createWindow({
		width : Ti.UI.FILL,
		height : settings.tabHeight
	});

	// set top/bottom of root window
	// and position of tabgroup

	if (!settings.tabsAtBottom) {	    
		tabGroupWindow.top = 0;
	} else {		
		tabGroupWindow.bottom = 0;
	}
}

function addTab(props) {

	// merge our defaults with the tab properties
	props = helpers.merge({

		backgroundSelectedColor : props.backgroundSelectedColor || settings.tabs.backgroundSelectedColor,
		font : props.font || settings.tabs.font,
		selectedFont : props.selectedFont || settings.tabs.selectedFont,
		selectedColor : props.selectedColor || settings.tabs.selectedColor,
		color : props.color || settings.tabs.color

	}, props);

	// create a new Tab instance
	var tab = Widget.createWidget(Widget.widgetId, "tab", props);

	// mark as active
	activeTab = activeTab || tab;

	// add to tabs collection
	tabs.push(tab);

	// if we have a window, configure and open it
	if (props.win) {

		tab.win = props.win;

		if (!settings.tabsAtBottom) {
			tab.win.top = settings.tabHeight;

		} else {
			tab.win.bottom = settings.tabHeight;
		}

		tab.win.visible = false;

		if (OS_IOS) {

			navGroup = Ti.UI.iPhone.createNavigationGroup({
				window : tab.win,
				visible : false
			});

			rootWindow.add(navGroup);

			tab.win.__navGroup = navGroup;
		}

		tab.win.open();

		tab.win.hide();

	}

	// user clicks this tab
	tab.on("tab:click", function() {

		if (tab !== activeTab) {

			tab.setActive();
			activeTab.setInactive();
			activeTab = tab;

		}

	});

	// add the tab to the view
	$.tabGroup.add(tab.getView());
}

// used to set initial settings
function configure(args) {

	// copy over the tabs settings
	settings.tabs = args.tabs || {};

	if (!OS_IOS) {
		settings.tabsAtBottom = args.tabsAtBottom;
	}

	init();


	// set defaults for background color and images
	tabGroupWindow.backgroundColor = args.backgroundColor || "#000";
	tabGroupWindow.backgroundImage = args.backgroundImage || null;

}

function open() {
	// refresh the layout
	refresh();

	// add the tabs
	tabGroupWindow.add($.getView());

	// open the tabgroup window
	tabGroupWindow.open();

	// show the root window
	rootWindow.show();

	// set the default tab
	activeTab.setActive();

	// check for rotation, need to refresh
	Ti.Gesture.addEventListener("orientationchange", refresh);
}

function refresh() {

	// cache values to speed things up
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;
	var tabCount = $.tabGroup.children.length;

	// iterate through the tabs and lay out
	$.tabGroup.children.forEach(function(tab) {

		// for some reason, issues with display caps on emulator so
		// %ages used for Android, absolute division for iOS
		if (OS_IOS) {
			tab.width = deviceWidth / tabCount;
		} else {
			tab.width = (99 / tabCount) + "%";
		}

	});
}

function getTabs() {
	return tabs;
}

function getActiveTab() {
	return activeTab;
}

function setActiveTab(t) {

	if (!isNaN(t)) {
		var tab = tabs[t];

		if (tab !== activeTab) {

			tab.setActive();
			activeTab.setInactive();
			activeTab = tab;

		}
	}
}

exports.configure = configure;
exports.init = init;
exports.open = open;
exports.refresh = refresh;
exports.addTab = addTab;
exports.getActiveTab = getActiveTab;
exports.setActiveTab = setActiveTab;

