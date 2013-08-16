var args = arguments[0] || {};

$.icon.backgroundImage = args.icon;
$.icon.backgroundSelectedImage = args.selectedIcon;

exports.setActive = function() {
	$.icon.backgroundImage = $.icon.backgroundSelectedImage || $.icon.backgroundImage;
};

exports.setInactive = function() {
	$.icon.backgroundImage =  args.icon;
};
