const fs = require('fs');
var define = require('./Define');

var outputPath = "output/";
var outputCSVData = "";

var map; // map data
var mapWidth;
var mapHeight;

var minRoomNum = 1;
var maxRoomNum = 13;
var roomNum;

var roomData = [];

var roomMinSize = 6;



function onPressInputButton() {
	mapWidth = InputForm.inputWidth.value;
	mapHeight = InputForm.inputHeight.value;
	mapCreate();
}

function mapCreate() {
	mapReset();
	mapSplit();
}

// 1. map data all wall
function mapReset() {
	map = new Array(mapHeight);
	for (let i = 0; i < mapHeight; i++) {
		map[i] = new Array(mapWidth);
		for (let j = 0; j < mapWidth; j++) {
			map[i][j] = define.WALL_ID;
		}
	}
}

function mapSplit() {
	roomData.push(splitRoomData);
	roomNum = Math.floor(Math.random() * (maxRoomNum + 1 - minRoomNum)) + minRoomNum; // roomNum
	roomData[0].top = 0;
	roomData[0].left = 0;
	roomData[0].bottom = mapHeight - 1;
	roomData[0].right = mapWidth - 1;
	roomData[0].areaRank = roomData[0].bottom * roomData[0].right; // room size

}

var splitRoomData = {
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	areaRank: 0,
	parentRoomId: 0,
	childRoomId: [],
	isSplitX: [],
	childSplitPos: [],
};

function outputCSVFile() {
	fs.writeFileSync(outputPath, outputCSVData);
}
