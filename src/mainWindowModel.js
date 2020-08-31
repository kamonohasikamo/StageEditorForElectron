const fs = require('fs');
var define = require('./Define');

var outputPath = "output/";
var outputCSVData = "";

var map; // map data
var MapWidth = 50;
var MapHeight = 30;

var MinRooms = 1;
var MaxRooms = 13;
var roomNum;

// var roomData = [];
var roomSprit = [];

var roomMinSize = 6;



function onPressInputButton() {
	MapWidth = InputForm.inputWidth.value;
	MapHeight = InputForm.inputHeight.value;
	// test();
	mapCreate();
}

function mapCreate() {
	mapReset();
	MapSprit();
	CreateRoom();
	CreateRoad();
	// mapSplit();
	// createRoom();
	// createRoad();
	test();
}

// 1. map data all wall
function mapReset() {
	console.log("reset");
	map = new Array(MapHeight);
	for (let i = 0; i < MapHeight; i++) {
		map[i] = new Array(MapWidth);
		for (let j = 0; j < MapWidth; j++) {
			map[i][j] = define.WALL_ID;
		}
	}
}

// 	MapResetData();
// 	MapSprit();
// 	CreateRoom();
// 	CreateRoad();
// 	CreateDungeon();
// }

function MapSprit() {
	var tmp = JSON.stringify(splitRoomData);
	tmp = JSON.parse(tmp);
	roomSprit.push(tmp);
	roomNum = Math.floor(getRandomArbitrary(MinRooms, MaxRooms)); //部屋数を決める
	// 大部屋作成
	roomSprit[0].Top = 0;
	roomSprit[0].Left = 0;
	roomSprit[0].Bottom = MapHeight - 1;
	roomSprit[0].Right = MapWidth - 1;
	roomSprit[0].areaRank = roomSprit[0].Bottom * roomSprit[0].Right; //部屋の大きさ

	for (var i = 1; i < roomNum; i++) {
		tmp = JSON.stringify(splitRoomData);
		tmp = JSON.parse(tmp);
		tmp.Top = 0;
		tmp.Left = 0;
		tmp.Bottom = 0;
		tmp.Right = 0;
		tmp.areaRank = 0;
		tmp.parentRoom = 0;
		tmp.childRoom = [];
		tmp.isSpritX = [];
		tmp.childSpritPos = [];
		roomSprit.push(tmp);
		var Target = 0; //分割する部屋
		var AreaMax = 0;    //最大面積だった部屋の面積

		// 最大の面積を持つ部屋を求める
		for (var j = 0; j < i; j++) {
			if (roomSprit[j].areaRank >= AreaMax) {
				AreaMax = roomSprit[j].areaRank;
				Target = j;
			}
		}
		// 分割点を求める
		if (roomSprit[Target].Right - roomSprit[Target].Left >= roomSprit[Target].Bottom - roomSprit[Target].Top) {
			//横分割
			// 縦横の大きさが最小値*2より大きい場合は実行
			if (roomSprit[Target].Right - roomSprit[Target].Left >= roomMinSize * 2 && roomSprit[Target].Bottom - roomSprit[Target].Top >= roomMinSize * 2) {

				// 分割点を求めて左座標へ入力する
				roomSprit[i].Left = roomSprit[Target].Left + Math.floor(getRandomArbitrary(roomMinSize, roomSprit[Target].Right - roomSprit[Target].Left - roomMinSize));
				roomSprit[i].Right = roomSprit[Target].Right;
				roomSprit[Target].Right = roomSprit[i].Left - 1;
				roomSprit[i].Top = roomSprit[Target].Top;
				roomSprit[i].Bottom = roomSprit[Target].Bottom;

				for (var ID = roomSprit[Target].childRoom.Count - 1; ID >= 0; ID--) {
					if (Target == roomSprit[roomSprit[Target].childRoom[ID]].parentRoom) {
						if (roomSprit[Target].Right < roomSprit[roomSprit[Target].childRoom[ID]].Left) {
							roomSprit[roomSprit[Target].childRoom[ID]].parentRoom = i;
							var t = JSON.stringify(roomSprit[Target].childRoom[ID]);
							t = JSON.parse(t);
							roomSprit[i].childRoom.push(t);
							roomSprit[i].isSpritX.push(true);
							var q = JSON.stringify(roomSprit[roomSprit[Target].childRoom[ID]].Left);
							q = JSON.parse(q);
							roomSprit[i].childSpritPos.push(q);

							roomSprit[Target].childRoom.forEach((item, index) => {
								if (item === ID) {
									roomSprit[Target].childRoom.splice(index, 1);
								}
							});
							roomSprit[Target].isSpritX.forEach((item, index) => {
								if (item === ID) {
									roomSprit[Target].isSpritX.splice(index, 1);
								}
							});
							roomSprit[Target].childSpritPos.forEach((item, index) => {
								if (item === ID) {
									roomSprit[Target].childSpritPos.splice(index, 1);
								}
							});
							break;
						}
					}
				}
				roomSprit[i].parentRoom = Target;
				roomSprit[Target].childRoom.push(i);
				roomSprit[Target].isSpritX.push(true);
				roomSprit[Target].childSpritPos.push(roomSprit[i].Left);
			} else {
				roomNum = i;
				break;
			}
			roomSprit[i].areaRank = (roomSprit[i].Right - roomSprit[i].Left) * (roomSprit[i].Bottom - roomSprit[i].Top);
			roomSprit[Target].areaRank = (roomSprit[Target].Right - roomSprit[Target].Left) * (roomSprit[Target].Bottom - roomSprit[Target].Top);

		} else {
			//縦分割
			// 縦横の大きさが最小値*2より大きい場合は実行
			if (roomSprit[Target].Right - roomSprit[Target].Left >= roomMinSize * 2 && roomSprit[Target].Bottom - roomSprit[Target].Top >= roomMinSize * 2) {

				// 分割点を求めて左座標へ入力する
				roomSprit[i].Top = roomSprit[Target].Top + Math.floor(getRandomArbitrary(roomMinSize, roomSprit[Target].Bottom - roomSprit[Target].Top - roomMinSize));
				roomSprit[i].Bottom = roomSprit[Target].Bottom;
				roomSprit[Target].Bottom = roomSprit[i].Top - 1;
				roomSprit[i].Left = roomSprit[Target].Left;
				roomSprit[i].Right = roomSprit[Target].Right;

				for (var ID = roomSprit[Target].childRoom.Count - 1; ID >= 0; ID--) {
					if (Target == roomSprit[roomSprit[Target].childRoom[ID]].parentRoom) {
						if (roomSprit[Target].Bottom < roomSprit[roomSprit[Target].childRoom[ID]].Top) {
							roomSprit[roomSprit[Target].childRoom[ID]].parentRoom = i;
							var t = JSON.stringify(roomSprit[Target].childRoom[ID]);
							t = JSON.parse(t);
							roomSprit[i].childRoom.push(t);
							roomSprit[i].isSpritX.push(true);
							var q = JSON.stringify(roomSprit[roomSprit[Target].childRoom[ID]].Top);
							q = JSON.parse(q);
							roomSprit[i].childSpritPos.push(q);

							roomSprit[Target].childRoom.forEach((item, index) => {
								if (item === ID) {
									roomSprit[Target].childRoom.splice(index, 1);
								}
							});
							roomSprit[Target].isSpritX.forEach((item, index) => {
								if (item === ID) {
									roomSprit[Target].isSpritX.splice(index, 1);
								}
							});
							roomSprit[Target].childSpritPos.forEach((item, index) => {
								if (item === ID) {
									roomSprit[Target].childSpritPos.splice(index, 1);
								}
							});
							break;

						}
					}
				}
				roomSprit[i].parentRoom = Target;
				roomSprit[Target].childRoom.push(i);
				roomSprit[Target].isSpritX.push(false);
				roomSprit[Target].childSpritPos.push(roomSprit[i].Top);
			} else {
				roomNum = i;
				break;
			}
			roomSprit[i].areaRank = (roomSprit[i].Right - roomSprit[i].Left) * (roomSprit[i].Bottom - roomSprit[i].Top);
			roomSprit[Target].areaRank = (roomSprit[Target].Right - roomSprit[Target].Left) * (roomSprit[Target].Bottom - roomSprit[Target].Top);
		}
	}
}

function CreateRoom() {
	var ratioX; //範囲を狭めた部屋の幅
	var ratioY; //範囲を狭めた部屋の高さ
	var moveX;  //範囲を狭めた時、範囲を動かす幅
	var moveY;  //範囲を狭めた時、範囲を動かす高さ
	for (var i = 0; i < roomNum; i++) { // 作成した部屋数実行する
		if (roomSprit[i] != null) {
			ratioY = roomSprit[i].Bottom - roomSprit[i].Top;    //部屋の高さを代入
			ratioY = Math.floor(getRandomArbitrary(0.6, 0.8) * ratioY);   //部屋の高さを乱数で調整
			ratioX = roomSprit[i].Right - roomSprit[i].Left;    //部屋の幅を代入
			ratioX = Math.floor(getRandomArbitrary(0.6, 0.8) * ratioX);   //部屋の幅を乱数で調整
			if (ratioY * 2 < ratioX)// 部屋が横長だった場合横の大きさを半分にする
			{
				ratioX /= 2;
			}
			else if (ratioX * 2 < ratioY)// 部屋が縦長だった場合縦の大きさを半分にする
			{
				ratioY /= 2;
			}


			moveY = (roomSprit[i].Bottom - roomSprit[i].Top - ratioY) / 2;  //上から下に動かす座標なので狭めた高さの半分を代入
			moveX = (roomSprit[i].Right - roomSprit[i].Left - ratioX) / 2;  //左から右に動かす座標なので狭めた幅の半分を代入
			roomSprit[i].Top += moveY;    // 区画の上座標に動かす高さの座標を足す
			roomSprit[i].Bottom = roomSprit[i].Top + ratioY;    // 区画の下座標に区画の上座標と部屋の高さを足す
			roomSprit[i].Left += moveX;   // 区画の左座標に動かす幅の座標を足す
			roomSprit[i].Right = roomSprit[i].Left + ratioX;    // 区画の右座標に区画の左座標と部屋の幅を足す

			// 部屋の範囲までMap配列に書き込む
			for (var j = 0; j < ratioY; j++) {
				for (var k = 0; k < ratioX; k++) {
					map[Math.floor(roomSprit[i].Left) + k + 1][Math.floor(roomSprit[i].Top) + j + 1] = define.ROOM_ID + i;  // 部屋の左側座標と増分をMapデータののXに、部屋の上側座標と増分をMapデータののYに設定する
				}
			}
		} else {
			break;
		}
	}
}

function CreateRoad() {
	var NowPos = 0;
	var NowDis = 0;
	var NextPos = 0;
	var NextDis = 0;
	var nowLines = 0;
	var nextLines = 0;

	for (var roomID = 0; roomID < roomNum; roomID++) {
		for (var childID = roomSprit[roomID].childRoom.Count - 1; childID >= 0; childID--) {
			if (roomSprit[roomID].isSpritX[childID]) {
				// X分割された
				NowPos = roomSprit[roomID].Bottom - roomSprit[roomID].Top;
				NowPos = Math.floor(getRandomArbitrary(1, NowPos)) + roomSprit[roomID].Top;
				NextPos = roomSprit[roomSprit[roomID].childRoom[childID]].Bottom - roomSprit[roomSprit[roomID].childRoom[childID]].Top;
				NextPos = Math.floor(getRandomArbitrary(1, NextPos)) + roomSprit[roomSprit[roomID].childRoom[childID]].Top;

				NowDis = roomSprit[roomID].childSpritPos[childID] - roomSprit[roomID].Right + 1;
				NextDis = roomSprit[roomSprit[roomID].childRoom[childID]].Left - roomSprit[roomID].childSpritPos[childID] + 1;

				// ライン補正
				if (roomSprit[roomID].Right + 1 < MapWidth) {
					if (NowPos + 1 < MapHeight)
						if (map[roomSprit[roomID].Right + 1][NowPos + 1] == define.NONE_ID)
							NowPos++;
					if (NowPos - 1 > 0)
						if (map[roomSprit[roomID].Right + 1][NowPos - 1] == define.NONE_ID)
							NowPos--;
				}

				if (roomSprit[roomSprit[roomID].childRoom[childID]].Left - 1 > 0) {
					if (NextPos + 1 < MapHeight) {
						if (map[roomSprit[roomSprit[roomID].childRoom[childID]].Left - 1][NextPos + 1] == define.NONE_ID)
							NextPos++;
					}
					if (NextPos - 1 > 0) {
						if (map[roomSprit[roomSprit[roomID].childRoom[childID]].Left - 1][NextPos - 1] == define.NONE_ID)
							NextPos--;
					}
				}




				// 横ライン作成 -------------
				// →ライン作成
				for (nowLines = 0; nowLines < NowDis; nowLines++) {
					if (nowLines + roomSprit[roomID].Right < MapWidth) {
						if (map[nowLines + roomSprit[roomID].Right][NowPos] == define.WALL_ID) {
							map[nowLines + roomSprit[roomID].Right][NowPos] = define.NONE_ID;

						}
					}
					else
						break;

				}

				// ←ライン作成
				for (nextLines = 0; nextLines < NextDis; nextLines++) {
					if (-nextLines + roomSprit[roomSprit[roomID].childRoom[childID]].Left > 0) {
						if (map[-nextLines + roomSprit[roomSprit[roomID].childRoom[childID]].Left][NextPos] == define.WALL_ID) {
							map[-nextLines + roomSprit[roomSprit[roomID].childRoom[childID]].Left][NextPos] = define.NONE_ID;
						}

					}
					else
						break;


				}


				// 縦ライン作成
				for (var lines = 0; ; lines++) {
					// NOWとNEXT、どちらの方が高さが大きいか調べ、縦ラインを作成する
					if (NowPos >= NextPos)  //NOWの方が多い時（次の部屋の通路の方が上側）
					{
						if (NextPos + lines < NowPos) {
							if (map[roomSprit[roomID].childSpritPos[childID]][NextPos + lines] == define.WALL_ID) {
								map[roomSprit[roomID].childSpritPos[childID]][NextPos + lines] = define.NONE_ID;
							}
						}
						else {
							RoadExtend(false, roomSprit[roomID].childSpritPos[childID], NextPos + lines);
							break;
						}


					}
					else    //NEXTの方が大きいとき（現在の部屋の通路の方が上側）
					{
						if (NowPos + lines < NextPos) {
							if (map[roomSprit[roomID].childSpritPos[childID]][NowPos + lines] == define.WALL_ID) {
								map[roomSprit[roomID].childSpritPos[childID]][NowPos + lines] = define.NONE_ID;
							}
						}
						else {
							RoadExtend(false, roomSprit[roomID].childSpritPos[childID], NowPos + lines);
							break;
						}

					}
				}

			}
			else {
				// Y分割された
				NowPos = roomSprit[roomID].Right - roomSprit[roomID].Left;
				NowPos = Math.floor(getRandomArbitrary(1, NowPos)) + roomSprit[roomID].Left;
				NextPos = roomSprit[roomSprit[roomID].childRoom[childID]].Right - roomSprit[roomSprit[roomID].childRoom[childID]].Left;
				NextPos = Math.floor(getRandomArbitrary(1, NextPos)) + roomSprit[roomSprit[roomID].childRoom[childID]].Left;

				NowDis = roomSprit[roomID].childSpritPos[childID] - roomSprit[roomID].Bottom + 1;
				NextDis = roomSprit[roomSprit[roomID].childRoom[childID]].Top - roomSprit[roomID].childSpritPos[childID] + 1;

				// ラインの修正

				// ライン補正
				if (roomSprit[roomID].Bottom + 1 < MapHeight) {
					if (NowPos + 1 < MapWidth)
						if (map[NowPos + 1][roomSprit[roomID].Bottom + 1] == define.NONE_ID)
							NowPos++;
					if (NowPos - 1 > 0)
						if (map[NowPos - 1][roomSprit[roomID].Bottom + 1] == define.NONE_ID)
							NowPos--;
				}

				if (roomSprit[roomSprit[roomID].childRoom[childID]].Top + 1 > 0) {
					if (NowPos + 1 < MapWidth)
						if (map[NowPos + 1][roomSprit[roomSprit[roomID].childRoom[childID]].Top + 1] == define.NONE_ID)
							NowPos++;
					if (NowPos - 1 > 0)
						if (map[NowPos - 1][roomSprit[roomSprit[roomID].childRoom[childID]].Top + 1] == define.NONE_ID)
							NowPos--;
				}


				// 縦ライン作成 -------------
				// ↓ライン作成
				for (nowLines = 0; nowLines < NowDis; nowLines++) {
					if (nowLines + roomSprit[roomID].Bottom < MapHeight) {
						if (map[NowPos][nowLines + roomSprit[roomID].Bottom] == define.WALL_ID) {
							map[NowPos][nowLines + roomSprit[roomID].Bottom] = define.NONE_ID;
						}
					}


				}

				// ↑ライン作成
				for (nextLines = 0; nextLines < NextDis; nextLines++) {
					if (-nextLines + roomSprit[roomSprit[roomID].childRoom[childID]].Top > 0) {
						if (map[NextPos][-nextLines + roomSprit[roomSprit[roomID].childRoom[childID]].Top] == define.WALL_ID) {
							map[NextPos][-nextLines + roomSprit[roomSprit[roomID].childRoom[childID]].Top] = define.NONE_ID;
						}
					}
				}

				// 横ライン作成
				for (var lines = 0; ; lines++) {
					// NOWとNEXT、どちらの方が高さが大きいか調べ、縦ラインを作成する
					if (NowPos >= NextPos)  //NOWの方が多い時（次の部屋の通路の方が上側）
					{
						if (NextPos + lines < NowPos) {
							if (map[NextPos + lines][roomSprit[roomID].childSpritPos[childID]] == define.WALL_ID)  //読み込み元のIDが壁ならば（Y座標が変動）
								map[NextPos + lines][roomSprit[roomID].childSpritPos[childID]] = define.NONE_ID;   //そのIDを通路にする
						}
						else {
							RoadExtend(true, NextPos + lines, roomSprit[roomID].childSpritPos[childID]);
							break;
						}
					}
					else    //NEXTの方が大きいとき（現在の部屋の通路の方が上側）
					{
						if (NextPos > NowPos + lines) {
							if (map[NowPos + lines][roomSprit[roomID].childSpritPos[childID]] == define.WALL_ID)    //読み込み元のIDが壁ならば（Y座標が変動）
								map[NowPos + lines][roomSprit[roomID].childSpritPos[childID]] = define.NONE_ID;    //そのIDを通路にする
						}
						else {
							RoadExtend(true, NowPos + lines, roomSprit[roomID].childSpritPos[childID]);
							break;
						}

					}
				}

			}
		}
	}
}


function RoadExtend(isX, x, y) {
	var isHit = false;
	var extendLine = 0;
	if (isX) {
		x++;
		for (; x + extendLine < MapWidth; extendLine++) {
			if (map[x + extendLine][y] == define.NONE_ID || map[x + extendLine][y] >= define.ROOM_ID) {
				isHit = true;
				break;
			}
			else if (map[x + extendLine][y + 1] == define.NONE_ID || map[x + extendLine][y + 1] >= define.ROOM_ID ||
				map[x + extendLine][y - 1] == define.NONE_ID || map[x + extendLine][y - 1] >= define.ROOM_ID) {
				extendLine++;
				isHit = true;
				break;
			}
		}
		if (isHit) {
			for (var Line = 0; Line < extendLine; Line++)
				map[x + Line][y] = define.NONE_ID;
		}
	}
	else {
		y++;
		for (; y + extendLine < MapHeight; extendLine++) {
			if (map[x][y + extendLine] == define.NONE_ID || map[x][y + extendLine] >= define.ROOM_ID) {
				isHit = true;
				break;
			}
			else if (map[x + 1][y + extendLine] == define.NONE_ID || map[x + 1][y + extendLine] >= define.ROOM_ID ||
				map[x - 1][y + extendLine] == define.NONE_ID || map[x - 1][y + extendLine] >= define.ROOM_ID) {
				isHit = true;
				extendLine++;
				break;
			}
		}
		if (isHit) {
			for (var Line = 0; Line < extendLine; Line++)
				map[x][y + Line] = define.NONE_ID;
		}
	}
}

function test() {
	console.log("define = " + define.NONE_ID);
	console.log(JSON.stringify(map));

	console.log("room0 = " + JSON.stringify(roomSprit, null, 2));
	var table = document.createElement('table');
	table.id = "tableId";
	table.style.width = "100%";
	table.style.height = "600px";
	for (let i = 0; i < MapHeight; i++) {
		var tr = document.createElement('tr');
		var x = 100 % MapWidth;
		var y = 100 % MapHeight;
		tr.style.width = String(x) + "%";
		tr.style.height = String(y) + "%";
		for (let j = 0; j < MapWidth; j++) {
			var td = document.createElement('td');
			td.style.width = String(x) + "%";
			td.style.height = String(y) + "%";
			switch (map[i][j]) {
				case define.WALL_ID:
					td.style.backgroundColor = "black";
					break;
				case define.NONE_ID:
					td.style.backgroundColor = "red";
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
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

var splitRoomData = {
	Top: 0,
	Left: 0,
	Bottom: 0,
	Right: 0,
	areaRank: 0,
	parentRoom: 0,
	childRoom: [],
	isSpritX: [],
	childSpritPos: [],
};

function outputCSVFile() {
	fs.writeFileSync(outputPath, outputCSVData);
}
