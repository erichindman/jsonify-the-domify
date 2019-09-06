import jsonHTML from './json-html.js';
import domJSON from './dom-json.js';

function manageEdits() {
	const textareas = document.querySelectorAll("textarea");
	const jsonBox = document.getElementById("write-json");
	const htmlBox = document.getElementById("write-html");
	const display = document.getElementById("display-result");

	textareas.forEach(textarea => {
		textarea.onkeydown = event => {
			if (event.key === "Tab") {
				event.preventDefault();
				textarea.value += '	';
			}
		};
	});

	htmlBox.oninput = event => {
		display.innerHTML = htmlBox.value;
		const jsonResult = domJSON(display);
		jsonBox.value = JSON.stringify(jsonResult, null, "  ");
	};

	jsonBox.oninput = event => {
		const json = JSON.parse(jsonBox.value);
		jsonHTML(json, display);
		htmlBox.value = display.innerHTML;
	};
}

document.addEventListener("DOMContentLoaded", manageEdits);
