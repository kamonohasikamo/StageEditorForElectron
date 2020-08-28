const fs = require('fs');
var outputCSVData = "1,2,3"; // test

function onPressInputButton() {
	var width = InputForm.inputWidth.value;
	var height = InputForm.inputHeight.value;
	console.log("w: " + width + " , h: " + height);
	//Write CSV file
	fs.writeFileSync("output/test.csv", outputCSVData);
}
