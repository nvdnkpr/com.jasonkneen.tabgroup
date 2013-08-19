var args = arguments[0] || {};

var helpers = require(WPATH("helpers"));

var defaultColor = "#fff", defaultSelectedColor = "#000";

$.caption.text = args.caption;
$.caption.color = args.color || defaultColor;
$.caption.selectedColor = args.selectedColor || defaultSelectedColor;

if (args.font) {
	$.caption.font = helpers.merge(args.font, $.caption.font);
}

exports.setActive = function() {
	$.caption.color = $.caption.selectedColor || defaultSelectedColor;

	if (args.selectedFont) {
		$.caption.font = helpers.merge(args.selectedFont, $.caption.font);
	}
};

exports.setInactive = function() {
	$.caption.color = args.color || defaultColor;

	if (args.font) {
		$.caption.font = helpers.merge(args.font, $.caption.font);
	}
};
