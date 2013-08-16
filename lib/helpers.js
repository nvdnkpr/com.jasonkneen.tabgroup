function merge(src, dest) {

	var atts = dest;

	for (var property in src) {

		atts[property] = src[property];

	}
	return atts;
}

exports.merge = merge; 