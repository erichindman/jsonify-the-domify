import jsonHTML from './json-html.js';
import domJSON from './dom-json.js';

function manageEdits() {
	const textareas = document.querySelectorAll("textarea");
	const jsonBox = document.getElementById("write-json");
	const htmlBox = document.getElementById("write-html");
	const display = document.getElementById("display-result");
	const shadowDoc = display.attachShadow({mode: 'open'});

	htmlBox.value = '<h2>Edit me through the means given above!</h2><p>Edit the<em style="color: blue"> HTML </em>or the<em style="color: red"> JSON </em>output to see it represented in real time</p>';
	shadowDoc.innerHTML = htmlBox.value;
	jsonBox.value = JSON.stringify(domJSON(shadowDoc), null, "  ");

	textareas.forEach(textarea => {
		textarea.onkeydown = event => {
			if (event.key === "Tab") {
				event.preventDefault();
				textarea.value += '	';
			}
		};
	});

	htmlBox.oninput = event => {
		shadowDoc.innerHTML = htmlBox.value;
		const jsonResult = domJSON(shadowDoc);
		jsonBox.value = JSON.stringify(jsonResult, null, "  ");
	};

	jsonBox.oninput = event => {
		const json = JSON.parse(jsonBox.value);
		jsonHTML(json, shadowDoc);
		htmlBox.value = shadowDoc.innerHTML;
	};
}

document.addEventListener("DOMContentLoaded", manageEdits);