var args = arguments[0] || {};

var helpers = require(WPATH("helpers"));

$.caption.applyProperties({
	text : args.caption || "None",
	color : args.color || "#fff",
	selectedColor : args.selectedColor || "#000"
});



var captionColor = $.caption.color;

if (args.font) {
	$.caption.font = helpers.merge(args.font, $.caption.font);
}

exports.setActive = function() {
	$.caption.color = $.caption.selectedColor || "#000";

	if (args.selectedFont) {
		$.caption.font = helpers.merge(args.selectedFont, $.caption.font);
	}
};

exports.setInactive = function() {
	$.caption.color = captionColor;

	if (args.font) {
		$.caption.font = helpers.merge(args.font, $.caption.font);
	}
};
