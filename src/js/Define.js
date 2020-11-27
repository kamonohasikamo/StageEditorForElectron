//===========================
// Define class
//===========================

// ID
const PLAYER_POSITION_ID = 100;
const NONE_ID = 101;
const WALL_ID = 102;
const NAVIGATOR_ID = 200;
const ROOM_ID = 1000;
const OUTPUT_PATH = "./output/";
// ID 追加したら以下にも追加すること
const data = [
	{
		name: "teleport",
		id: "1-99\ntoNum",
		color: "blue",
	},
	{
		name: "PLAYER_POSITION_ID",
		id: PLAYER_POSITION_ID,
		color: "yellow",
	},
	{
		name: "NONE_ID",
		id: NONE_ID,
		color: "NONE",
	},
	{
		name: "WALL_ID",
		id: WALL_ID,
		color: "green"
	},
	{
		name: "NAVIGATOR_ID",
		id: NAVIGATOR_ID,
		color: "NONE"
	},
]

module.exports = {
	WALL_ID: WALL_ID,
	NONE_ID: NONE_ID,
	ROOM_ID: ROOM_ID,
	PLAYER_POSITION_ID: PLAYER_POSITION_ID,
	data: data,
	OUTPUT_PATH: OUTPUT_PATH,
};