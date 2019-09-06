function buildObject(node) {
		
		const tag = node.localName;
		const attrObject = {};
		const descendents = []
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
            descendents.push([
                'commentNode',
                String(child.textContent).trim()
            ])
        } 
        if (child.nodeType === 1) {        
            if (!child.classList.contains('IGNORE-EDITS')) {
                descendents.push(buildObject(child));     
            }
        }
    })
    
    return [tag, attrObject, ...descendents];
}

function domJSON(rootNode) {
	const object = []; 
	Array.from(rootNode.childNodes).forEach(child => {
		if (child.nodeType !== 3) {
			object.push(buildObject(child));
		}
	})

	return object;
}

function IGNORE() {

	
	
	const populateDestination = (json, dest) => {
	
		while (dest.firstChild) {
			dest.removeChild(dest.firstChild)
		}
		json.forEach(item => {
			dest.append(generateNode(item));
		})
	}	
}

const transformNode = node => {
	if (Array.isArray(node)) {
		return generateNode(node);
	} 
	 else {
	   return String(node);
	}
};

const generateNode = array => {
   
   if (array[0] === 'comment') {
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
   })

   return el;
}
const populateDestination = (json, dest) => {

	while (dest.firstChild) {
		dest.removeChild(dest.firstChild)
	}
	json.forEach(item => {
		dest.append(generateNode(item));
	})
}	

function onReady() {
	const textareas = document.querySelectorAll('textarea');
	const jsonBox = document.getElementById('write-json');
	const htmlBox = document.getElementById('write-html');
	const display = document.getElementById('display-result');

	textareas.forEach(textarea => {
		textarea.addEventListener('keydown', event => {
			if (event.key === 'Tab') {
				event.preventDefault();
				textarea.value += '    ';
			};
		});
	});

	htmlBox.oninput = event => {
		display.innerHTML = htmlBox.value

		const jsonResult = domJSON(display);
		jsonBox.value = JSON.stringify(jsonResult, null, '  ');
	}

	jsonBox.oninput = event => {
		const json = JSON.parse(jsonBox.value);
		populateDestination(json, display)
		
		htmlBox.value = display.innerHTML;
	 }

}

document.addEventListener('DOMContentLoaded', onReady);