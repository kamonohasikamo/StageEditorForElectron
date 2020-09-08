const fs = require('fs');
const define = require('./js/Define');
var file = document.getElementById('inputStageData');
var result = document.getElementById('showStage');


function loadCSVFile(e) {
	// ファイル情報を取得
	var fileData = e.target.files[0];

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
	for (var i = 0; i < data.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < data[i].length; j++) {
			var td = document.createElement('td');
			td.innerText = data[i][j];
			if (data[i][j] == define.NONE_ID) {
				td.style.backgroundColor = "yellow";
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	return table;
}