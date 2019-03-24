var begin = true;
var first = true;
var end = false;

var correct = [];
var guess = [];

var wins = 0;
var losses = 0;

var guessRemain = 10;

var randomWordsList = ["red", "love", "kill"];
var randomWord = "";

function printArray (arr) {
	var string = "";
	for (var i = 0; i < arr.length; i++) {
		string = string + arr[i] + " ";
	}
	return string;
}

function setGame () {
	randomWord = randomWordsList[Math.floor(Math.random() * randomWordsList.length)];
	for (var i=0; i < randomWord.length; i++) {
		correct.push("_");
	}
	document.getElementById("text").innerHTML = printArray(correct);
	document.getElementById("guess").innerHTML = "# of Guess Remaining: <br> " + guessRemain;
	document.getElementById("used").innerHTML = "Used Letters: " + printArray(guess);
	document.getElementById("info").style.display = "none";
}

setGame();

var interval = setInterval(function() {
	if (begin === true) {
		document.getElementById("begin").style.display = "none";
		begin = false;
	}
	else {
		document.getElementById("begin").style.display = "initial";
		begin = true;
	}
}, 700);

document.onkeyup = function(event) {
	if (first) {
		clearInterval(interval);
		first = false;
		document.getElementById("begin").innerHTML = "Wins: " + wins + ", Losses: " + losses;
		document.getElementById("begin").style.display = "initial";
	}

	if (end) {
		end = false;
		guessRemain = 10;
		correct = [];
		guess = [];
		setGame();
	}
	else{
		if (randomWord.includes(event.key)) {
			for (var i = 0; i < randomWord.length; i++) {
				if (randomWord[i] === event.key) {
					correct[i] = event.key;
				}
			}
			document.getElementById("text").innerHTML = printArray(correct);
			if (!correct.includes("_")) {
				wins += 1;
				document.getElementById("begin").innerHTML = "Wins: " + wins + ", Losses: " + losses;
				document.getElementById("info").style.display = "initial";
				end = true;
			}
		}
		else {
			if (!guess.includes(event.key.toUpperCase())){
				guess.push(event.key.toUpperCase());
				guessRemain -= 1;
				document.getElementById("used").innerHTML = "Used Letters: " + printArray(guess);
				document.getElementById("guess").innerHTML = "# of Guess Remaining: <br> " + guessRemain;
				if (guessRemain === 0) {
					losses += 1;
					document.getElementById("begin").innerHTML = "Wins: " + wins + ", Losses: " + losses;
					document.getElementById("info").style.display = "initial";
					end = true;
				}
			}
		}
	}
	
}