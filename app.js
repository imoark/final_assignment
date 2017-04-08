/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  
  // Make sure the element has the required properties.
  if (isValidElement(element)) {
    data[element.name] = element.value;
  }

  return data;

}, {});


// define where to grab the content from 
const productName = document.getElementById('productName');
console.log(productName)

const brandName = document.getElementById('brandName');
console.log(brandName)

const price = document.getElementById('price');
console.log(price)

const date = document.getElementById('date');
console.log(date)

// define where to put the content to


// target the form, to prevent default action
const inputForm = document.getElementById('inputForm');
console.log(inputData)

// finalDB = []

var database = localStorage.getItem('finalDB');
finalDB = JSON.parse(database);
if(!finalDB){
	finalDB = [];
};


// create the function of adding item, and assign them into a 'const/let/var'
const addItem = (a) => {
	// this is to prevent a default event of form in HTML
	// so, whenever we submit form, it doesn't do anything except interact
	// with our Javascript
	a.preventDefault();
	// this if is to tell if there is no value in the form, 
	// return/finish the function and do nothing
	if (!productName.value){
		alert('Please enter item name')
		return;
	};
	if (!brandName.value){
		alert('Please enter brand name')
		return;
	};
	if (!price.value){
		alert('Please enter the price')
		return;
	};
	if (!date.value){
		alert('Please enter date purchased')
		return;
	};

	// Call our function to get the form data.
  	const data = formToJSON(inputForm.elements);
  	console.log(data)

  	finalDB.push(data)

	// Demo only: print the form data onscreen as a formatted JSON object.
	const dataContainer = document.getElementsByClassName('results__display')[0];

	// Use `JSON.stringify()` to make the output valid, human-readable JSON.
	const jsonData = JSON.stringify(data, null, "  ");

	dataContainer.textContent = jsonData;

	jsonDB = JSON.stringify(finalDB, null, "  ");

	/*We need to change from array to string, 
	so we use "JSON.stringify".*/
	localStorage.setItem('finalDB', jsonDB);
	productName.value = '';
	
}


/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element => {
  return element.name && element.value;
};


inputForm.addEventListener('submit', addItem);


function findMatches(wordToMatch, finalDB){
	return finalDB.filter( place => {
		// we need to figure out if the keyword match with our Brand JSON
		const regex = new RegExp(wordToMatch, 'gi')
		return place.brandName.match(regex) || place.productName.match(regex)
	})
}

function displayMatches(){
	const matchArray = findMatches(this.value, finalDB);
	const html = matchArray.map( place => {
		const regex = new RegExp(this.value, 'gi')
		const brandName = place.brandName.replace(regex, `<span class="hl">${this.value}</span>`);
		const productName = place.productName.replace(regex, `<span class="hl">${this.value}</span>`);
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'X';
	 	deleteButton.addEventListener('click', function(){
	 		//In todos(array), todo is which number?
	 		//"indexOf" 
	 		finalDB.splice();
	 		var index = finalDB.indexOf(place);
	 		finalDB.splice(index,1);
	 	});
	 	let renderDelete = suggestions.appendChild(deleteButton) 

		return `
<li>
  <span class="name">${brandName}, ${productName}</span>
  <span class="price">`+ '$' + `${place.price}</span>
  <span class="purchase">${place.date}</span>
  <span> ${renderDelete} </span>
</li>
		`;
	}).join('');
	suggestions.innerHTML = html;
	// console.log(matchArray);
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)