function buildObject(node) {
	const tag = node.localName;
	const attrObject = {};
	const descendents = [];
	const attrs = Array.from(node.attributes);

	attrs.forEach(attr => {
		const key = attr.name;
		const value = attr.value;
		attrObject[key] = value;
	});

	Array.from(node.childNodes).forEach(child => {
		if (child.nodeType === 3) {
			if (String(child.textContent).trim()) {
				descendents.push(String(child.textContent).trim());
			}
		}
		if (child.nodeType === 8) {
			descendents.push(["commentNode", String(child.textContent).trim()]);
		}
		if (child.nodeType === 1) {
			if (!child.classList.contains("IGNORE-EDITS")) {
				descendents.push(buildObject(child));
			}
		}
	});

	return [tag, attrObject, ...descendents];
}
export default function domJSON(rootNode) {
	const object = []
	Array.from(rootNode.childNodes).forEach(child => {
		if (child.nodeType !== 3) {
			object.push(buildObject(child));
		}
	});
	return object;
}