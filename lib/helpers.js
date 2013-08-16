// merge the properties of src
// into dest and return the result
function merge(src, dest) {

	var atts = dest;

	for (var property in src) {

		atts[property] = src[property];

	}
	return atts;
}

exports.merge = merge; 