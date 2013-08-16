var args = arguments[0] || {};

var helpers = require(WPATH("helpers"));

var tabBackgroundColor;

$.tab.backgroundSelectedColor = args.backgroundSelectedColor || "#fff";

if (args.view) {

	// custom view
	$.wrapper.add(args.view);

} else {

	// create our icon and caption
	var icon = Widget.createWidget(Widget.widgetId, "icon", args);
	var caption = Widget.createWidget(Widget.widgetId, "caption", args);

	// use default icon / caption
	$.wrapper.add(icon.getView());
	$.wrapper.add(caption.getView());

	$.tab.applyProperties({
		backgroundColor : args.backgroundColor || "transparent",
		backgroundImage : args.backgroundImage || null
	});

}

$.clickZone.addEventListener("click", function() {
	$.trigger("tab:click");
});

function setActive() {

	if (!args.selectedView) {

		$.tab.backgroundColor = $.tab.backgroundSelectedColor || $.tab.backgroundColor;

		icon.setActive();
		caption.setActive();

	} else {

		$.wrapper.add(args.selectedView);
		$.wrapper.remove(args.view);

	}

	if (args.win) {

		args.win.show();

		if (args.win.__navGroup) {
			args.win.__navGroup.show();
		}

	}
}

function setInactive() {

	if (!args.selectedView) {

		$.tab.backgroundColor = tabBackgroundColor;

		icon.setInactive();
		caption.setInactive();

	} else {

		$.wrapper.add(args.view);
		$.wrapper.remove(args.selectedView);

	}

	if (args.win) {

		args.win.hide();

		if (args.win.__navGroup) {
			args.win.__navGroup.hide();
		}

	}
}

function open(subWindow) {
	if (OS_IOS) {
		args.win.__navGroup.open(win);
	} else {
		win.open();
	}
}


$.getView().getController = function() {
	return $;
};

exports.setInactive = setInactive;
exports.setActive = setActive;
exports.open = open;
