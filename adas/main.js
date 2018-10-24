/*		----- Quick tutorial -----
1. All variables in js can be defined as 'var'. Objects, functions, strings, int, etc. = var 
2. Because of this a good practise is to identify variable name by its type	
	by putting i for integer, s for string, etc. in the name as iVariable, sVariable etc.
3. To debug, simply write 'debugger' in a new line and press F12 in browser. 
	The code should stop at the 'debugger' part in here
	Another way is simply write console.log("hello") and it will print "hello" or whatever 

*/

function testFunctionCalculate(){ //for demonstration purposes
	var fFirstValue = document.getElementById("inputTest1").value;
	var fSecondValue = document.getElementById("inputTest2").value;
	var iResult = Math.round(fFirstValue * fSecondValue);
	document.getElementById("inputTest3").value = iResult;
	console.log("this is first input: " + fFirstValue);
	console.log(`this is second input: ${fSecondValue}`);
	console.log('this is result:' + iResult);
	//debugger
	//uncomment line above to stop code there (while F12 or debugger tab is open)
}

function getElement(id){
	//just shortens code
	return document.getElementById(id);
}

function isChecked(id){
	//returns true or false
	return getElement(id).checked;
}

function getAllCheckboxArray(){
	var oContainer = getElement('questionDiv');
	var aInputs = oContainer.getElementsByTagName('input');
	var aCheckboxes = [];
	
	//returns an array of objects with all checkbox id's and their values
	//[{id: "checkbox11", value: true}, {...}, ...]
	//should work always no matter how many checkboxes as long as they are 
	//under the <div id="questionDiv"> in index.html
	//you can access this arrays properties later using
	//aCkeckboxes[element].id or aCheckboxes[element].value
	
	for (var i = 0; i < aInputs.length; i++) {
		var bValue = isChecked(aInputs[i].id);
		var sId = aInputs[i].id;
		aCheckboxes.push(
			{
				id: sId,
				value: bValue
			}
		)
	}
	//i may have overdone this but we have results from every single checkbox here
	return aCheckboxes;
}

function applyArrayToLocalStorage(aCheckboxes){
	//add this submission to our 'database'
	localStorage.firstAnswer = parseInt(localStorage.firstAnswer) + parseBoolean(aCheckboxes[0].value);
	localStorage.secondAnswer = parseInt(localStorage.secondAnswer) + parseBoolean(aCheckboxes[1].value);
	localStorage.thirdAnswer = parseInt(localStorage.thirdAnswer) + parseBoolean(aCheckboxes[2].value);
	localStorage.fourthAnswer = parseInt(localStorage.fourthAnswer) + parseBoolean(aCheckboxes[3].value);
	localStorage.fifthAnswer = parseInt(localStorage.fifthAnswer) + parseBoolean(aCheckboxes[4].value);
	localStorage.sixthAnswer = parseInt(localStorage.sixthAnswer) + parseBoolean(aCheckboxes[5].value);
	localStorage.seventhAnswer = parseInt(localStorage.seventhAnswer) + parseBoolean(aCheckboxes[6].value);
	localStorage.eigthAnswer = parseInt(localStorage.eigthAnswer) + parseBoolean(aCheckboxes[7].value);
	localStorage.ninthAnswer = parseInt(localStorage.ninthAnswer) + parseBoolean(aCheckboxes[8].value);
	localStorage.tenthAnswer = parseInt(localStorage.tenthAnswer) + parseBoolean(aCheckboxes[9].value);
}

function parseBoolean(bool){
	//parse true to 1 and false to 0
	if (bool){
		return 1;
	} else {
		return 0;
	}
}

function checkAll(iRow) {
	//just change the number below if more/less questions
	var iNumberOfQuestions = 5;
	var aIds = [];
	for(var i = 1; i < iNumberOfQuestions + 1; i++){
		var sId = "checkbox" + i + iRow;
		getElement(sId).checked = true;
	}
}

function unCheckAll(iRow) {
	//just change the number below if more/less questions
    	var iNumberOfQuestions = 5;
	var aIds = [];
	for(var i = 1; i < iNumberOfQuestions + 1; i++){
		var sId = "checkbox" + i + iRow;
		getElement(sId).checked = false;
	}
}

function buttonPressResults(){
	//store data to browser cookies
	//this is needed if we start fresh or clear memory so we have the object parameter
	if(!localStorage.hasOwnProperty('userSubmissionCount')){
		localStorage.userSubmissionCount = 0;
		createBlankLocalStorageModule();
	}	
	
	//store submisson count in browser cookies
	localStorage.userSubmissionCount = parseInt(localStorage.userSubmissionCount) + 1;
	var iCount = localStorage.userSubmissionCount;
	
	//you can use this array to determine the user's answers to all of the questions	
	var aCheckboxes = getAllCheckboxArray();	
	//add this user submissionto our cookies
	applyArrayToLocalStorage(aCheckboxes);
		
	
	//get cookie values (this is sum of all previous submissions)
	//paraugs?
	var a1 = localStorage.firstAnswer;
	var a2 = localStorage.secondAnswer;
	var a3 = localStorage.thirdAnswer;
	var a4 = localStorage.fourthAnswer;
	var a5 = localStorage.fifthAnswer;
	var a6 = localStorage.sixthAnswer;
	var a7 = localStorage.seventhAnswer;
	var a8 = localStorage.eigthAnswer;
	var a9 = localStorage.ninthAnswer;
	var a10 = localStorage.tenthAnswer;
	
	//this array goes to the drawing board
	var aAnswers = [
		{1: a1, 2: a2, k: calculateKoif(a1, a2)}, 
		{1: a3, 2: a4, k: calculateKoif(a3, a4)}, 
		{1: a5, 2: a6, k: calculateKoif(a5, a6)}, 
		{1: a7, 2: a8, k: calculateKoif(a7, a8)}, 
		{1: a9, 2: a10, k: calculateKoif(a9, a10)}
	];
	
	//draw results
	setCanvas(aAnswers)
}


function calculateKoif(answer1, answer2){
	//here we calculate the koif. ?

	//just for the sake of it 
	
	//calculate or do something
	var result = (parseInt(answer1) + parseInt(answer2))/2;
	
	//return value
	return result;
}

function createBlankLocalStorageModule(){
	//create these object attributes becauses we had cleared storage
	localStorage.firstAnswer = 0;
	localStorage.secondAnswer = 0;
	localStorage.thirdAnswer = 0;
	localStorage.fourthAnswer = 0;
	localStorage.fifthAnswer = 0;
	localStorage.sixthAnswer = 0;
	localStorage.seventhAnswer = 0;
	localStorage.eigthAnswer = 0;
	localStorage.ninthAnswer = 0;
	localStorage.tenthAnswer = 0;
}

function setCanvas(aAnswers) { 
	//don't wory about this
	var canvas = getElement("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "1em Arial";
	var height = 20;
	
	//paraugs kā izskatās rezultāti?
	/*
	var aAnswers = [
		{1: 0, 2: 1, k: 0.4}, 
		{1:1, 2:5, k: 0.4}, 
		{1:5, 2:6, k: 0.4}, 
		{1:0, 2:5, k: 0.4}, 
		{1:1, 2:8, k: 0.4}
	];
	*/
	
	//submission count
	ctx.fillText("Lietotāju skaits:", 0, height);
	ctx.fillText(localStorage.userSubmissionCount, canvas.width/4, height);
	height = height + 40;
	
	//virsraksti
	ctx.fillText("Jautājums", 0, height);
	ctx.fillText("Atbilde1 ?", canvas.width/4, height);
	ctx.fillText("Atbilde2 ?", canvas.width/2, height);	
	ctx.fillText("Koificients ?", canvas.width/1.5, height);
	height = height + 40;
	
	//1 jaut
	ctx.fillText("1:", 0, height);
	ctx.fillText(aAnswers[0][1], canvas.width/4, height);
	ctx.fillText(aAnswers[0][2], canvas.width/2, height);	
	ctx.fillText(aAnswers[0]["k"], canvas.width/1.5, height);
	height = height + 40;
	
	//2 jaut
	ctx.fillText("2:", 0, height);
	ctx.fillText(aAnswers[1][1], canvas.width/4, height);
	ctx.fillText(aAnswers[1][2], canvas.width/2, height);	
	ctx.fillText(aAnswers[1]["k"], canvas.width/1.5, height);
	height = height + 40;
	
	//3 jaut
	ctx.fillText("3:", 0, height);
	ctx.fillText(aAnswers[2][1], canvas.width/4, height);
	ctx.fillText(aAnswers[2][2], canvas.width/2, height);	
	ctx.fillText(aAnswers[2]["k"], canvas.width/1.5, height);
	height = height + 40;
	
	//4 jaut
	ctx.fillText("4:", 0, height);
	ctx.fillText(aAnswers[3][1], canvas.width/4, height);
	ctx.fillText(aAnswers[3][2], canvas.width/2, height);	
	ctx.fillText(aAnswers[3]["k"], canvas.width/1.5, height);
	height = height + 40;
	
	//5jaut
	ctx.fillText("5:", 0, height);
	ctx.fillText(aAnswers[4][1], canvas.width/4, height);
	ctx.fillText(aAnswers[4][2], canvas.width/2, height);	
	ctx.fillText(aAnswers[4]["k"], canvas.width/1.5, height);
	height = height + 40;
	
	
}

function buttonPressClearLocalStorage() { 
	//clear browser memory
	localStorage.clear();
	
	//delete drawing board
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}