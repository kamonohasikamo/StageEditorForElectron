const Define = require('./js/Define');
var setElement = document.getElementById("showID");

window.onload = function () {
	var table = document.createElement('table');
	table.id = "showIDTable";
	table.style.border = 1;
	for (var i = -1; i < Define.data.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < Object.keys(Define.data[0]).length; j++) {
			if (i == -1) {
				var th = document.createElement('th');
				switch (j % Object.keys(Define.data[0]).length) {
					case 0:
						th.textContent = "ID";
						break;
					case 1:
						th.textContent = "Name";
						break;
					case 2:
						th.textContent = "Color"
						break;
				}
				tr.appendChild(th);
			} else {
				var td = document.createElement('td');
				switch (j % Object.keys(Define.data[0]).length) {
					case 0:
						td.textContent = Define.data[i].id;
						break;
					case 1:
						td.textContent = Define.data[i].name;
						break;
					case 2:
						td.textContent = Define.data[i].color;
						break;
				}
				tr.appendChild(td);
			}
		}
		table.appendChild(tr);
	}

	setElement.appendChild(table);
}
