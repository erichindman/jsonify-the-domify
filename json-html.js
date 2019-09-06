const transformNode = node => {
	if (Array.isArray(node)) {
		return generateNode(node);
	} else {
		return String(node);
	}
};
const generateNode = array => {
	if (array[0] === "comment") {
		return new Comment(array[1]);
	}
	const [name, attrs, ...children] = array;
	const el = document.createElement(name);

	const keys = Object.keys(attrs);
	keys.forEach(name => {
		el.setAttribute(name, attrs[name]);
	});

	children.forEach(child => {
		el.append(transformNode(child));
	});

	return el;
};

export default function  jsonHTML(json, dest) {
	while (dest.firstChild) {
		dest.removeChild(dest.firstChild);
	}
	json.forEach(item => {
		dest.append(generateNode(item));
	});
};