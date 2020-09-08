const fs = require('fs');
var define = require('./js/Define');

var map = []; // map data
var mapWidth = 50;
var mapHeight = 30;

var minRoomNum = 1;
var maxRoomNum = 13;
var roomNum;

var roomData = [];

var roomMinSize = 6;

function onPressInputButton() {
	mapWidth = InputForm.inputWidth.value;
	mapHeight = InputForm.inputHeight.value;
	minRoomNum = InputForm.inputRoomMin.value;
	maxRoomNum = InputForm.inputRoomMax.value;
	roomMinSize = InputForm.inputRoomMinSize.value;
	mapCreate();
}

function mapCreate() {
	mapReset();
	mapSprit();
	CreateRoom();
	outputTable();
}

// 1. map data all wall
function mapReset() {
	for (let i = 0; i < mapHeight; i++) {
		map[i] = [];
		for (let j = 0; j < mapWidth; j++) {
			map[i][j] = define.WALL_ID;
		}
	}
}

function mapSprit() {
	// 参照渡しを値渡しに切り替える
	var tmp = JSON.stringify(splitRoomData);
	tmp = JSON.parse(tmp);
	roomData.push(tmp);
	roomNum = Math.floor(getRandomArbitrary(minRoomNum, maxRoomNum)); //部屋数を決める
	// 大部屋作成
	roomData[0].top = 0;
	roomData[0].left = 0;
	roomData[0].bottom = mapHeight - 1;
	roomData[0].right = mapWidth - 1;
	roomData[0].areaRank = roomData[0].bottom * roomData[0].right; //部屋の大きさ

	for (var i = 1; i < roomNum; i++) {
		tmp = JSON.stringify(splitRoomData);
		tmp = JSON.parse(tmp);
		tmp.top = 0;
		tmp.left = 0;
		tmp.bottom = 0;
		tmp.right = 0;
		tmp.areaRank = 0;
		tmp.parentRoom = 0;
		tmp.childRoom = [];
		tmp.isSpritX = [];
		tmp.childSpritPos = [];
		roomData.push(tmp);
		var targetRoom = 0; //分割する部屋
		var areaMaxSize = 0;    //最大面積だった部屋の面積

		// 最大の面積を持つ部屋を求める
		for (var j = 0; j < i; j++) {
			if (roomData[j].areaRank >= areaMaxSize) {
				areaMaxSize = roomData[j].areaRank;
				targetRoom = j;
			}
		}
		// 分割点を求める
		if (roomData[targetRoom].right - roomData[targetRoom].left >= roomData[targetRoom].bottom - roomData[targetRoom].top) {
			//横分割
			// 縦横の大きさが最小値*2より大きい場合は実行
			if (roomData[targetRoom].right - roomData[targetRoom].left >= roomMinSize * 2 && roomData[targetRoom].bottom - roomData[targetRoom].top >= roomMinSize * 2) {

				// 分割点を求めて左座標へ入力する
				roomData[i].left = roomData[targetRoom].left + Math.floor(getRandomArbitrary(roomMinSize, roomData[targetRoom].right - roomData[targetRoom].left - roomMinSize));
				roomData[i].right = roomData[targetRoom].right;
				roomData[targetRoom].right = roomData[i].left - 1;
				roomData[i].top = roomData[targetRoom].top;
				roomData[i].bottom = roomData[targetRoom].bottom;

				for (var id = roomData[targetRoom].childRoom.Count - 1; id >= 0; id--) {
					if (targetRoom == roomData[roomData[targetRoom].childRoom[id]].parentRoom) {
						if (roomData[targetRoom].right < roomData[roomData[targetRoom].childRoom[id]].left) {
							roomData[roomData[targetRoom].childRoom[id]].parentRoom = i;
							var t = JSON.stringify(roomData[targetRoom].childRoom[id]);
							t = JSON.parse(t);
							roomData[i].childRoom.push(t);
							roomData[i].isSpritX.push(true);
							var q = JSON.stringify(roomData[roomData[targetRoom].childRoom[id]].left);
							q = JSON.parse(q);
							roomData[i].childSpritPos.push(q);

							roomData[targetRoom].childRoom.forEach((item, index) => {
								if (item === id) {
									roomData[targetRoom].childRoom.splice(index, 1);
								}
							});
							roomData[targetRoom].isSpritX.forEach((item, index) => {
								if (item === id) {
									roomData[targetRoom].isSpritX.splice(index, 1);
								}
							});
							roomData[targetRoom].childSpritPos.forEach((item, index) => {
								if (item === id) {
									roomData[targetRoom].childSpritPos.splice(index, 1);
								}
							});
							break;
						}
					}
				}
				roomData[i].parentRoom = targetRoom;
				roomData[targetRoom].childRoom.push(i);
				roomData[targetRoom].isSpritX.push(true);
				roomData[targetRoom].childSpritPos.push(roomData[i].left);
			} else {
				roomNum = i;
				break;
			}
			roomData[i].areaRank = (roomData[i].right - roomData[i].left) * (roomData[i].bottom - roomData[i].top);
			roomData[targetRoom].areaRank = (roomData[targetRoom].right - roomData[targetRoom].left) * (roomData[targetRoom].bottom - roomData[targetRoom].top);

		} else {
			//縦分割
			// 縦横の大きさが最小値*2より大きい場合は実行
			if (roomData[targetRoom].right - roomData[targetRoom].left >= roomMinSize * 2 && roomData[targetRoom].bottom - roomData[targetRoom].top >= roomMinSize * 2) {

				// 分割点を求めて左座標へ入力する
				roomData[i].top = roomData[targetRoom].top + Math.floor(getRandomArbitrary(roomMinSize, roomData[targetRoom].bottom - roomData[targetRoom].top - roomMinSize));
				roomData[i].bottom = roomData[targetRoom].bottom;
				roomData[targetRoom].bottom = roomData[i].top - 1;
				roomData[i].left = roomData[targetRoom].left;
				roomData[i].right = roomData[targetRoom].right;

				for (var id = roomData[targetRoom].childRoom.Count - 1; id >= 0; id--) {
					if (targetRoom == roomData[roomData[targetRoom].childRoom[id]].parentRoom) {
						if (roomData[targetRoom].bottom < roomData[roomData[targetRoom].childRoom[id]].top) {
							roomData[roomData[targetRoom].childRoom[id]].parentRoom = i;
							var t = JSON.stringify(roomData[targetRoom].childRoom[id]);
							t = JSON.parse(t);
							roomData[i].childRoom.push(t);
							roomData[i].isSpritX.push(true);
							var q = JSON.stringify(roomData[roomData[targetRoom].childRoom[id]].top);
							q = JSON.parse(q);
							roomData[i].childSpritPos.push(q);

							roomData[targetRoom].childRoom.forEach((item, index) => {
								if (item === id) {
									roomData[targetRoom].childRoom.splice(index, 1);
								}
							});
							roomData[targetRoom].isSpritX.forEach((item, index) => {
								if (item === id) {
									roomData[targetRoom].isSpritX.splice(index, 1);
								}
							});
							roomData[targetRoom].childSpritPos.forEach((item, index) => {
								if (item === id) {
									roomData[targetRoom].childSpritPos.splice(index, 1);
								}
							});
							break;

						}
					}
				}
				roomData[i].parentRoom = targetRoom;
				roomData[targetRoom].childRoom.push(i);
				roomData[targetRoom].isSpritX.push(false);
				roomData[targetRoom].childSpritPos.push(roomData[i].top);
			} else {
				roomNum = i;
				break;
			}
			roomData[i].areaRank = (roomData[i].right - roomData[i].left) * (roomData[i].bottom - roomData[i].top);
			roomData[targetRoom].areaRank = (roomData[targetRoom].right - roomData[targetRoom].left) * (roomData[targetRoom].bottom - roomData[targetRoom].top);
		}
	}
}

function CreateRoom() {
	var ratioX; //範囲を狭めた部屋の幅
	var ratioY; //範囲を狭めた部屋の高さ
	var moveX;  //範囲を狭めた時、範囲を動かす幅
	var moveY;  //範囲を狭めた時、範囲を動かす高さ
	for (var i = 0; i < roomNum; i++) {
		if (roomData[i] != null) {
			// 部屋の高さ調整
			ratioY = roomData[i].bottom - roomData[i].top;
			ratioY = Math.floor(getRandomArbitrary(0.6, 0.8) * ratioY);
			// 部屋の幅調整
			ratioX = roomData[i].right - roomData[i].left;
			ratioX = Math.floor(getRandomArbitrary(0.6, 0.8) * ratioX);

			if (ratioY * 2 < ratioX) { // 部屋が横長のとき横の大きさを半分にする
				ratioX /= 2;
			} else if (ratioX * 2 < ratioY) { // 部屋が縦長のとき縦の大きさを半分にする
				ratioY /= 2;
			}


			moveY = (roomData[i].bottom - roomData[i].top - ratioY) / 2;  //上から下に動かす座標なので狭めた高さの半分を代入
			moveX = (roomData[i].right - roomData[i].left - ratioX) / 2;  //左から右に動かす座標なので狭めた幅の半分を代入
			roomData[i].top += moveY;    // 区画の上座標に動かす高さの座標を足す
			roomData[i].bottom = roomData[i].top + ratioY;    // 区画の下座標に区画の上座標と部屋の高さを足す
			roomData[i].left += moveX;   // 区画の左座標に動かす幅の座標を足す
			roomData[i].right = roomData[i].left + ratioX;    // 区画の右座標に区画の左座標と部屋の幅を足す

			// 部屋の範囲までmap配列に書き込む
			for (var j = 0; j < ratioY; j++) {
				for (var k = 0; k < ratioX; k++) {
					var xPos = Number(Math.floor(roomData[i].left) + k);
					var yPos = Number(Math.floor(roomData[i].top) + j);
					map[xPos][yPos] = define.ROOM_ID + i;  // 部屋の左側座標と増分をmapデータのXに、部屋の上側座標と増分をmapデータのYに設定する
				}
			}
		} else {
			break;
		}
	}
}

function outputTable() {
	// tableDataがあれば削除
	var beforeTable = document.getElementById('tableId');
	if (beforeTable != null) {
		var parent = beforeTable.parentNode;
		parent.removeChild(beforeTable);
	}

	var table = document.createElement('table');
	table.id = "tableId";
	table.style.width = "100%";
	table.style.height = "600px";
	for (let i = 0; i < mapHeight; i++) {
		var tr = document.createElement('tr');
		var x = Math.floor(100 / mapWidth);
		var y = Math.floor(100 / mapHeight);
		tr.style.width = String(x) + "%";
		tr.style.height = String(y) + "%";
		for (let j = 0; j < mapWidth; j++) {
			var td = document.createElement('td');
			td.style.width = String(x) + "%";
			td.style.height = String(y) + "%";
			switch (map[i][j]) {
				case define.WALL_ID:
					td.style.backgroundColor = "black";
					break;
				default:
					td.style.backgroundColor = "yellow";
					break;
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	document.getElementById('showTable').appendChild(table);

	// create output CSV button

	// outputCSVButton があれば削除
	var beforeOutputCSVButton = document.getElementById('outputCSVButtonId');
	if (beforeOutputCSVButton != null) {
		var parent = beforeOutputCSVButton.parentNode;
		parent.removeChild(beforeOutputCSVButton);
	}

	var outputCSVButton = document.createElement('input');
	outputCSVButton.id = "outputCSVButtonId";
	outputCSVButton.type = "button";
	outputCSVButton.className = "Button";
	outputCSVButton.value = "CSV出力";
	outputCSVButton.onclick = onPressOutputCSVButtonId;
	document.getElementById('showTable').appendChild(outputCSVButton);

}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

// template
var splitRoomData = {
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	areaRank: 0,
	parentRoom: 0,
	childRoom: [],
	isSpritX: [],
	childSpritPos: [],
};

// output CSV File
function onPressOutputCSVButtonId() {
	var fileName = "";
	fileName = InputForm.outputFileName.value;
	if (fileName != null) {
		fileName += ".csv";
	} else {
		fileName = "output.csv";
	}
	var outputCSVData = "";
	for (let i = 0; i < mapHeight; i++) {
		for (let j = 0; j < mapWidth; j++) {
			if (map[i][j] >= 100) {
				outputCSVData += define.NONE_ID + ",";
			} else {
				outputCSVData += map[i][j] + ",";
			}
		}
		outputCSVData.slice(0, -1); // 末尾の「, 」を削除
		outputCSVData += "\n";
	}
	fs.writeFileSync(define.OUTPUT_PATH + fileName, outputCSVData);
	alert(define.OUTPUT_PATH + fileName + "にCSVデータを出力しました。");
}
