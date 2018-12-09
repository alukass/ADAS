/*		

------------------------------ Quick tutorial on Javascript ------------------------------

1. All variables in js can be defined as 'var'. Objects, functions, strings, int, etc. = var
   New js supports const and let variables but for simplicity ignore that in here 
2. Because of this a good practise is to identify variable name by its type	
	by putting i for integer, s for string, etc. in the name as iVariable, sVariable etc.
3. To debug, simply write 'debugger' in a new line and press F12 in browser. 
	The code should stop at the 'debugger' part in here
	Another way is simply write console.log("hello") and it will print "hello" or whatever 

*/

/*

------------------------------ Points of notice for editing ------------------------------

1. Currently this app supports max 10 custom questions. If you change the number, 
   please edit integers in functions checkAll() and buttonRefreshTable()
2. Currently this app supports only yes/no answers for questions expecting true/false values.
   Question titles do not matter, matters the answer - true/false


*/

/*

------------------------------ Utility and UI functions ------------------------------

*/

function getElement(id){
	//just shortens code
	return document.getElementById(id);
}

function parseBoolean(bool){
	//parse true to 1 and false to 0
	return bool ? 1 : 0
}

function check(iRow, iColumn, bChecked){
	//sets checkbox element to true or false
	var sId = "checkbox" + iRow + iColumn;
	getElement(sId).checked = bChecked;
}

function swapCheckbox(sWhichOne){
	var sId = "checkbox" + sWhichOne;
	getElement(sId).checked = false;
}

function isChecked(id){
	//returns true or false
	return getElement(id).checked;
}

function populateSubmission(){
	var iCount = readLocalStorage("userSubmissionCount");
	getElement("ZB").value = iCount;
}

function populateTable(iRow){
	var table = getElement("idTable");
	var oldTable = table.getElementsByTagName('tbody')[0];
	//creates new table data rows
	var newTable = document.createElement("tbody");
	for (var i = 0; i < iRow; i++){
		var row = newTable.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = i + 1;
		cell2.innerHTML = countCellAnswers(i, 1);
		cell3.innerHTML = countCellAnswers(i, 2);
		cell4.innerHTML = countCellAnswers(i, 3);
	}
	//deletes old table data rows
	oldTable.parentNode.replaceChild(newTable, oldTable);
}

function countCellAnswers(iRow, iCell){
	//data = Knowledge Base = [{},{},...,{}]
	var data = readLocalStorage("data");
	//array of all instances for answer of this question (true, false, null)
	var aQuestionAnswers = data.map(x=>x[iRow].answer);
	//debugger
	//count of all true answers
	var iTrue = aQuestionAnswers.filter(x => x === true).length;
	//count of all false answers
	var iFalse = aQuestionAnswers.filter(x => x === false).length;
	//count of all null answers
	var iNull = aQuestionAnswers.filter(x => x === null || x === undefined).length;
	//return true, false or null values for the asked 1,2 or 3 table cell
	return iCell === 1 ? iTrue : iCell === 2 ? iFalse : iNull  
} 

function createBlankLocalStorageModule(){
	//create these object attributes becauses we had cleared browser cookies
	var emptyArr = [];
	localStorage.setItem("data", JSON.stringify(emptyArr));
	localStorage.userSubmissionCount = 0;
}

function readLocalStorage(id){
	return JSON.parse(localStorage.getItem(id));
}

function applyArrayToLocalStorage(aCheckboxes){
	//add this submission to our 'database'
	var oldAnswers = readLocalStorage("data");
	oldAnswers.push(aCheckboxes);
	localStorage.setItem("data", JSON.stringify(oldAnswers));
}

/*

------------------------------ Button functions ------------------------------

*/

function checkAll(iColumn, bChecked) {
	//just change the number below if more/less questions (currently will work with max 10)
	var iNumberOfQuestions = 10;
	var aIds = [];
	for(var iRow = 0; iRow < iNumberOfQuestions; iRow++){
		//deselect
		bChecked === false ? check(iRow, iColumn, false) : 
			//select and deselect opposite
			iColumn === 1 ? 
				check(iRow, 2, false)&(check(iRow, iColumn, true)):
					iColumn === 3 ? 
						check(iRow, 4, false)&(check(iRow, iColumn, true)):
						iColumn == 4 ?
							check(iRow, 3, false)&(check(iRow, iColumn, true)):
				check(iRow, 1, false)&(check(iRow, iColumn, true))	
	}
}

function buttonPressResults(){	
	/*
		store data in browser cookies
		this is needed if we start a fresh browser session or clear memory so we have the 
		object parameter initialised (no errors)
	*/
	if(!localStorage.hasOwnProperty('userSubmissionCount')){
		createBlankLocalStorageModule();
	}	
	if(!localStorage.hasOwnProperty('data')){
		createBlankLocalStorageModule();
	}	
	
	//(+ 1 submission count)
	localStorage.userSubmissionCount = parseInt(localStorage.userSubmissionCount) + 1;
	var iCount = localStorage.userSubmissionCount;
	
	//submitted answer
	var aAnswers = getAllCheckboxArray();	
	
	//(+ 1 submission)
	applyArrayToLocalStorage(aAnswers);
	
	//refresh table
	buttonPressRefresh();
}

function buttonPressClearLocalStorage() { 
	//clear browser memory
	localStorage.clear();
	createBlankLocalStorageModule();
	buttonPressRefresh();
}

function buttonPressRefresh(){	
	//just change the number below if more/less questions (currently will work with max 10)
	var iRow = 10;
	populateSubmission();
	populateTable(iRow)
}

function buttonAddData(){
		
}

/*

------------------------------ ADAS functions ------------------------------

*/

function getAllCheckboxArray(){
	//gets selected question answers
	var oContainer = getElement('questionDiv');
	var aInputs = oContainer.getElementsByTagName('input');
	var aAnswers = [], bAnswer;
	
	for (var i = 0; i < aInputs.length; true) {
		//get temp array for each question with answers
		var aTemp = [null, null];
		for (var keys in aTemp){
			aTemp[keys] = aInputs[i].checked;
			i++;
		}
		
		//format temp array
		
		/*		
		[false, false] = null, because we will know this answer was not answered
		[true, false] = true, because if answer is 'yes' then answer is yes
		[false, true] = false, because if answer is not 'yes', it is no
		*/
		aTemp.filter(x=>x===true).length === 0 ? bAnswer = null : bAnswer = aTemp[0]
		
		//push this question to answer array (same formatting as in data.js)
		aAnswers.push({
			question: i/2,
			answer: bAnswer
		})
	}	
	var bResult = getElement('form').children['answer'].checked;
	aAnswers.push({result: bResult})
	return aAnswers;
}

function calculateKoif(answer1, answer2){
	//here we calculate the koif. ?

	//just for the sake of it 
	
	//calculate or do something
	var result = (parseInt(answer1) + parseInt(answer2))/2;
	
	//return value
	return result;
}
