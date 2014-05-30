var com1 = [3, 1, 2, 2];
var com2 = [3, 1, 1, 3];
var com3 = [4, 1, 1, 2];
var avail_money = 100;


var currentCom = com1;
var currentBatsmen = 0;
var currentWicketKeepers = 0;
var currentAllRounders = 0;
var currentBowlers = 0;

updateMoneyLabel();
document.getElementById("compositions").selectedIndex = 0;

function changeComposition() {
	compositionID = document.getElementById("compositions").selectedIndex;
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

function batsmenChanged(batsmanID) {
	
	batsmanIDString = batsmanID.toString();
	base_str = "batsman";
	chosen_base_str = "chosen_batsman";
	var batsman = document.getElementById(base_str.concat(batsmanIDString));
	var chosen_batsman = document.getElementById(chosen_base_str.concat(batsmanIDString));

	/* If the state is changed to checked */
	if (batsman.checked) {
		
		if (currentBatsmen >= currentCom[0]) {
			batsman.checked = false;
			//Add an error message here
			return;
		}
		chosen_batsman.innerHTML = batsman.value;
		currentBatsmen++;
		avail_money -= Number(batsman.getAttribute("cost"));
	} else {
		currentBatsmen--;
		chosen_batsman.innerHTML = "";
		avail_money += Number(batsman.getAttribute("cost"));
	}
	updateMoneyLabel();
}

function wicketKeepersChanged(wicketKeeperID) {
	
	wicketKeeperIDString = wicketKeeperID.toString();
	base_str = "wicketKeeper";
	chosen_base_str = "chosen_wicketKeeper";
	var wicketKeeper = document.getElementById(base_str.concat(wicketKeeperIDString));
	var chosen_wicketKeeper = document.getElementById(chosen_base_str.concat(wicketKeeperIDString));

	/* If the state is changed to checked */
	if (wicketKeeper.checked) {
		
		if (currentWicketKeepers >= currentCom[1]) {
			wicketKeeper.checked = false;
			//Add an error message here
			return;
		}
		chosen_wicketKeeper.innerHTML = wicketKeeper.value;
		currentWicketKeepers++;
		avail_money-=Number(wicketKeeper.getAttribute("cost"));
	} else {
		currentWicketKeepers--;
		chosen_wicketKeeper.innerHTML = "";
		avail_money += Number(wicketKeeper.getAttribute("cost"));
	}
	updateMoneyLabel();
}

function allRoundersChanged(allRoundersID) {
	
	allRoundersIDString = allRoundersID.toString();
	base_str = "allRounder";
	chosen_base_str = "chosen_allRounder";
	var allRounder = document.getElementById(base_str.concat(allRoundersIDString));
	var chosen_allRounder = document.getElementById(chosen_base_str.concat(allRoundersIDString));

	/* If the state is changed to checked */
	if (allRounder.checked) {
		
		if (currentAllRounders >= currentCom[2]) {
			allRounder.checked = false;
			//Add an error message here
			return;
		}
		chosen_allRounder.innerHTML = allRounder.value;
		currentAllRounders++;
		avail_money-=Number(allRounder.getAttribute("cost"));
	} else {
		currentAllRounders--;
		chosen_allRounder.innerHTML = "";
		avail_money += Number(allRounder.getAttribute("cost"));
	}
	updateMoneyLabel();
}

function bowlersChanged(bowlerID) {
	
	bowlerIDString = bowlerID.toString();
	base_str = "bowler";
	chosen_base_str = "chosen_bowler";
	var bowler = document.getElementById(base_str.concat(bowlerIDString));
	var chosen_bowler = document.getElementById(chosen_base_str.concat(bowlerIDString));

	/* If the state is changed to checked */
	if (bowler.checked) {
		
		if (currentBowlers >= currentCom[3]) {
			bowler.checked = false;
			//Add an error message here
			return;
		}
		chosen_bowler.innerHTML = bowler.value;
		currentBowlers++;
		avail_money-=Number(bowler.getAttribute("cost"));
	} else {
		currentBowlers--;
		chosen_bowler.innerHTML = "";
		avail_money += Number(bowler.getAttribute("cost"));
	}
	updateMoneyLabel();
}

function updateMoneyLabel() {
	var moneyLabel = document.getElementById("money");
	moneyLabel.innerHTML = avail_money;
}







