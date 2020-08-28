const fs = require('fs');
var define = require('./Define');

var outputPath = "output/";
var outputCSVData = "1,2,3"; // test

function onPressInputButton() {
	var width = InputForm.inputWidth.value;
	var height = InputForm.inputHeight.value;
	console.log("w: " + width + " , h: " + height);
	//console.log("Define = " + define.WALL_ID + ", " + define.NONE_ID)
}

function outputCSVFile() {
	fs.writeFileSync(outputPath, outputCSVData);
}
