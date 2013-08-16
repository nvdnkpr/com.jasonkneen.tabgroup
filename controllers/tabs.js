var rootWindow = arguments[0] || {};

var helpers = require(WPATH("helpers"));

var activeTab;
var tabGroupWindow;

// defaults
var settings = {
	navHeight : OS_IOS ? 40 : 69,
	tabHeight : OS_IOS ? 49 : 69,
	tabGroup : {},
	tabs : {}
};

// initialise the tabGroup Window
function init() {

	// hide the root window
	rootWindow.hide();
	rootWindow.open();

	// configure rootwindow
	configureWindow(rootWindow);

	// create our tab window to hold the view
	tabGroupWindow = Ti.UI.createWindow({
		width : Ti.UI.FILL,
		height : settings.tabHeight,
		bottom : 0
	});
}

function configureWindow(win) {

	// position the bottom of the window
	win.bottom = settings.tabHeight;

	if (win.children.length === 1) {
		// if the window has one child control, adjust it
		win.children[0].top = settings.navHeight;

	} else {
        // if not, wrap the controls in a child and adjust
		var wrapper = Ti.UI.createView({
			top : settings.navHeight
		});

		if (OS_IOS) {
			// add the kids in one go
			wrapper.add(win.children);

		} else {
			// above crashes Android so add them all individually
			win.children.forEach(function(child) {
				wrapper.add(child);
			});
		}

		win.add(wrapper);
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

    // if we have a window, configure and open it
	if (props.win) {

		tab.win = props.win;

		configureWindow(tab.win);

		tab.win.hide();
		tab.win.open();

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
function set(args) {

	// copy over the tabs settings
	settings.tabs = args.tabs || {};

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

	// iterate through the tabs and lay out
	$.tabGroup.children.forEach(function(tab) {

		// for some reason, issues with display caps on emulator so
		// %ages used for Android, absolute division for iOS
		if (OS_IOS) {
			tab.width = Ti.Platform.displayCaps.platformWidth / $.tabGroup.children.length;
		} else {
			tab.width = (100 / $.tabGroup.children.length) + "%";
		}

	});
}

exports.init = init;
exports.open = open;
exports.addTab = addTab;
exports.refresh = refresh;
exports.set = set;
