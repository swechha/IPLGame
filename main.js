/* Composition options */
var com1 = [3, 1, 2, 2];
var com2 = [3, 1, 1, 3];
var com3 = [4, 1, 1, 2];
var avail_money = 100; /*current available money*/
var team_name; /*team name*/

var batsmen_list = [{name:"Expensive Batsman", cost:"22", index:"0"},
					{name:"Average Batsman", cost:"12", index:"1"}, 
					{name:"Another Batsman", cost:"11", index:"2"}, 
					{name:"Stupid Batsman", cost:"4", index:"3"}, 
					{name:"Star Batsman", cost:"18", index:"4"}, 
					{name:"Koko Captain", cost:"14", index:"5"}, 
					{name:"Mif Blue", cost:"8", index:"6"}]; 

var wicketKeepers_list = [	{name:"MS Dony", cost:"10", index:"0"}, 
							{name:"George Bush", cost:"15", index:"1"}, 
							{name:"Wicket Keeper", cost:"9", index:"2"}, 
							{name:"Qwert Yee", cost:"11", index:"3"}];

var allRounders_list = [{name:"AllRounder Awesome", cost:"18", index:"0"}, 
						{name:"Lame Pro", cost:"11", index:"1"}, 
						{name:"Bad Book", cost:"10", index:"2"}, 
						{name:"All Rounder", cost:"8", index:"3"}, 
						{name:"Harry Potter", cost:"13", index:"4"}];

var bowlers_list = [{name:"Forrest Gump", cost:"10", index:"0"}, 
					{name:"DB Malty", cost:"6", index:"1"}, 
					{name:"Normal Bowler", cost:"5", index:"2"}, 
					{name:"Sac Ten", cost:"6", index:"3"}, 
					{name:"God Zila", cost:"4", index:"4"}, 
					{name:"Swechha Prakash", cost:"7", index:"5"}];


var currentCom = com1;
var currentBatsmen = [];
var currentWicketKeepers = [];
var currentAllRounders = [];
var currentBowlers = [];


function init() {
	if (sessionStorage.getItem("composition")) {
		document.getElementById("compositions").selectedIndex = Number(sessionStorage.getItem("composition"))-1;
		restoreComposition();
	}
	if (sessionStorage.getItem("avail_money")) {
		avail_money = sessionStorage.getItem("avail_money");
		updateMoneyLabel();
	}
	if (sessionStorage.getItem("team_name")) {
		team_name = sessionStorage.getItem("team_name");
		document.getElementById("team_name").value = team_name;
	}
	if (sessionStorage.getItem("currentBatsmen")) {
		currentBatsmen = JSON.parse(sessionStorage.getItem("currentBatsmen"));
	}
	if (sessionStorage.getItem("currentWicketKeepers")) {
		currentWicketKeepers = JSON.parse(sessionStorage.getItem("currentWicketKeepers"));
	}
	if (sessionStorage.getItem("currentAllRounders")) {
		currentAllRounders = JSON.parse(sessionStorage.getItem("currentAllRounders"));
	}
	if (sessionStorage.getItem("currentBowlers")) {
		currentBowlers = JSON.parse(sessionStorage.getItem("currentBowlers"));
	}
	updateCheckboxes();
}

function restoreComposition() {
	var compositionID = document.getElementById("compositions").selectedIndex;
	compositionID++;
	switch(compositionID)
	{
		case 1: currentCom = com1;
				break;
		case 2: currentCom = com2;
				break;
		case 3: currentCom = com3;
				break;
		default:
				currentCom = com1;
	}
}

function changeComposition() {
	var compositionID = document.getElementById("compositions").selectedIndex;
	compositionID++;
	sessionStorage.setItem("composition", compositionID);
	switch(compositionID)
	{
		case 1: currentCom = com1;
				break;
		case 2: currentCom = com2;
				break;
		case 3: currentCom = com3;
				break;
		default:
				currentCom = com1;
	}
	resetLists();
}

function resetLists() {
	currentBatsmen = [];
	currentWicketKeepers = [];
	currentAllRounders = [];
	currentBowlers = [];

	sessionStorage.setItem("currentBatsmen", JSON.stringify(currentBatsmen));
	sessionStorage.setItem("currentWicketKeepers", JSON.stringify(currentWicketKeepers));
	sessionStorage.setItem("currentAllRounders", JSON.stringify(currentAllRounders));
	sessionStorage.setItem("currentBowlers", JSON.stringify(currentBowlers));

	updateCheckboxes();

	avail_money = 100;
	updateMoneyLabel();
	sessionStorage.setItem("avail_money", avail_money);

	var cusid_ele = document.getElementsByClassName('chkb');
	for (var i = 0; i < cusid_ele.length; ++i) {
	    var item = cusid_ele[i];  
	    item.checked = false;
	}
}


function batsmenChanged(batsmanID) {
	
	var batsman = batsmen_list[batsmanID-1];
	var cost = Number(batsman.cost);

	var checkbox = document.getElementById("batsman".concat(batsmanID));

	if (checkbox.checked) {
		if (currentBatsmen.length >= currentCom[0]) {
			//display some error message here
			checkbox.checked = false;
			return;
		}
		if (avail_money - cost < 0) {
			alert("Cannot afford this batsman. Please select another one");
			checkbox.checked = false;
			return;
		}
		currentBatsmen.push(batsman);
		avail_money -= cost;
	} else {
		var index = currentBatsmen.indexOf(batsman);
		currentBatsmen.splice(index,1);
		avail_money += cost;
	}
	sessionStorage.setItem("currentBatsmen", JSON.stringify(currentBatsmen));
	sessionStorage.setItem("avail_money", avail_money);
	updateMoneyLabel();
}

function wicketKeepersChanged(wicketKeeperID) {
	
	var wicketKeeper = wicketKeepers_list[wicketKeeperID-1];
	var cost = Number(wicketKeeper.cost);

	var checkbox = document.getElementById("wicketKeeper".concat(wicketKeeperID));

	if (checkbox.checked) {
		if (currentWicketKeepers.length >= currentCom[1]) {
			//display some error message here
			checkbox.checked = false;
			return;
		}
		if (avail_money - cost < 0) {
			alert("Cannot afford this wicket keeper. Please select another one");
			checkbox.checked = false;
			return;
		}
		currentWicketKeepers.push(wicketKeeper);
		avail_money -= cost;
	} else {
		var index = currentWicketKeepers.indexOf(wicketKeeper);
		currentWicketKeepers.splice(index,1);
		avail_money += cost;
	}
	sessionStorage.setItem("currentWicketKeepers", JSON.stringify(currentWicketKeepers));
	sessionStorage.setItem("avail_money", avail_money);
	updateMoneyLabel();
}

function allRoundersChanged(allRounderID) {
	
	var allRounder = allRounders_list[allRounderID-1];
	var cost = Number(allRounder.cost);

	var checkbox = document.getElementById("allRounder".concat(allRounderID));

	if (checkbox.checked) {
		if (currentAllRounders.length >= currentCom[2]) {
			//display some error message here
			checkbox.checked = false;
			return;
		}
		if (avail_money - cost < 0) {
			alert("Cannot afford this all rounder. Please select another one");
			checkbox.checked = false;
			return;
		}
		currentAllRounders.push(allRounder);
		avail_money -= cost;
	} else {
		var index = currentAllRounders.indexOf(allRounder);
		currentAllRounders.splice(index,1);
		avail_money += cost;
	}
	sessionStorage.setItem("currentAllRounders", JSON.stringify(currentAllRounders));
	sessionStorage.setItem("avail_money", avail_money);
	updateMoneyLabel();
}

function bowlersChanged(bowlerID) {
	
	var bowler = bowlers_list[bowlerID-1];
	var cost = Number(bowler.cost);

	var checkbox = document.getElementById("bowler".concat(bowlerID));

	if (checkbox.checked) {
		if (currentBowlers.length >= currentCom[3]) {
			//display some error message here
			checkbox.checked = false;
			return;
		}
		if (avail_money - cost < 0) {
			alert("Cannot afford this bowler. Please select another one");
			checkbox.checked = false;
			return;
		}
		currentBowlers.push(bowler);
		avail_money -= cost;
	} else {
		var index = currentBowlers.indexOf(bowler);
		currentBowlers.splice(index,1);
		avail_money += cost;
	}
	sessionStorage.setItem("currentBowlers", JSON.stringify(currentBowlers));
	sessionStorage.setItem("avail_money", avail_money);
	updateMoneyLabel();
}

function updateMoneyLabel() {
	var moneyLabel = document.getElementById("money");
	moneyLabel.innerHTML = avail_money;
}

function inputsAreComplete() {
	teamNameLabel = document.getElementById("team_name");
	if (teamNameLabel.value != null && currentBatsmen.length == currentCom[0] && currentWicketKeepers.length == currentCom[1]
		&& currentAllRounders.length == currentCom[2] && currentBowlers.length == currentCom[3]) {
		return true;
	}
	return false;
}

function teamNameChanged() {
	//Add some validations here
	team_name = document.getElementById("team_name").value;
	sessionStorage.setItem("team_name", document.getElementById("team_name").value);
}

function updateCheckboxes()
{
	for(var i=0; i<currentBatsmen.length; i++) {
		var player = currentBatsmen[i];
		index = Number(player.index);
		index++;
		document.getElementById("batsman".concat(index)).checked = true;
	}
	for(var i=0; i<currentWicketKeepers.length; i++) {
		var player = currentWicketKeepers[i];
		index = Number(player.index);
		index++;
		document.getElementById("wicketKeeper".concat(index)).checked = true;
	}
	for(var i=0; i<currentAllRounders.length; i++) {
		var player = currentAllRounders[i];
		index = Number(player.index);
		index++;
		document.getElementById("allRounder".concat(index)).checked = true;
	}
	for(var i=0; i<currentBowlers.length; i++) {
		var player = currentBowlers[i];
		index = Number(player.index);
		index++;
		document.getElementById("bowler".concat(index)).checked = true;
	}
}

/* -------------------------------------------------------------------------------------------------------------------*/
//getters
function getBatsmenList() {
	return batsmen_list;
}

function getWicketKeepersList() {
	return wicketKeepers_list;
}

function getAllRoundersList() {
	return allRounders_list;
}

function getBowlersList() {
	return bowlers_list;
}

function getCurrentBatsmenList() {
	return currentBatsmen;
}

function getCurrentWicketKeepersList() {
	return currentWicketKeepers;
}

function getCurrentAllRoundersList() {
	return currentAllRounders;
}

function getCurrentBowlersList() {
	return currentBowlers;
}

