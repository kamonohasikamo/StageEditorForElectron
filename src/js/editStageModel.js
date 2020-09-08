const fs = require('fs');
const define = require('./js/Define');
var file = document.getElementById('inputStageData');
var result = document.getElementById('showStage');

var fileName = "";

function loadCSVFile(e) {
	// ファイル情報を取得
	var fileData = e.target.files[0];
	fileName = fileData.name;
	// ファイル読み込み
	var reader = new FileReader();
	// ファイル読み込みに成功したときの処理
	reader.onload = function () {
		// 改行で行の切り替えし判定
		var cols = reader.result.split('\n');
		var data = [];
		// CSVなのでカンマ区切りで読み込む
		for (var i = 0; i < cols.length; i++) {
			data[i] = cols[i].split(',');
		}
		// カンマ区切りで区切ったデータをテーブルに
		var insert = createTable(data);
		result.appendChild(insert);
	}
	// ファイル読み込みを実行
	reader.readAsText(fileData, 'Shift_JIS');
}
file.addEventListener('change', loadCSVFile, false);

function createTable(data) {
	createOutputButton();
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
	for (var i = 0; i < data.length - 1; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < data[i].length - 1; j++) {
			var td = document.createElement('td');
			var inputNum = document.createElement('input');
			inputNum.type = "tel";
			inputNum.value = data[i][j];
			inputNum.style.width = "10px";
			inputNum.setAttribute("onInput", "onChangeBackGroundColor(this)");
			td.appendChild(inputNum);
			//td.innerText = data[i][j];
			if (data[i][j] == define.NONE_ID) {
				td.style.backgroundColor = "red";
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	return table;
}

// 編集後のCSVファイル出力用ボタン
function createOutputButton() {
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
	outputCSVButton.onclick = onPressOutputCSVButton;
	document.getElementById('outputButton').appendChild(outputCSVButton);
}

// CSV出力処理
function onPressOutputCSVButton() {
	if (fileName == null) {
		fileName = "output.csv";
	}
	var tableData = document.getElementById("tableId");
	if (tableData == null) {
		alert("テーブルを見つけられませんでした。");
		return;
	}

	var mapHeight = tableData.rows.length;
	var mapWidth = tableData.rows[0].cells.length;
	var outputCSVData = "";
	for (let i = 0; i < mapHeight; i++) {
		for (let j = 0; j < mapWidth; j++) {
			outputCSVData += tableData.rows[i].cells[j].childNodes[0].value + ",";
		}
		outputCSVData.slice(0, -1); // 末尾の「, 」を削除
		outputCSVData += "\n";
	}
	fs.writeFileSync(define.OUTPUT_PATH + fileName, outputCSVData);
	alert(define.OUTPUT_PATH + fileName + "にCSVデータを出力しました。");
}

// 数字が入力されたら色を変える処理
function onChangeBackGroundColor($this) {
	var parent = $this.parentNode;
	if ($this.value == define.NONE_ID) {
		parent.style.backgroundColor = "yellow";
	} else {
		parent.style.backgroundColor = "white";
	}
}