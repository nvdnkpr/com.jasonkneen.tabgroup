var args = arguments[0] || {};

$.icon.applyProperties({
	backgroundImage : args.icon,
	backgroundSelectedImage : args.selectedIcon
});

var iconBackgroundImage = $.icon.backgroundImage;

exports.setActive = function() {
	$.icon.backgroundImage = $.icon.backgroundSelectedImage || $.icon.backgroundImage;
};

exports.setInactive = function() {
	$.icon.backgroundImage = iconBackgroundImage;
};
