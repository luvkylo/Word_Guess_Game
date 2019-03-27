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

// print array as string
function printArray (arr) {
	var string = "";
	for (var i = 0; i < arr.length; i++) {
		string = string + arr[i] + " ";
	}
	return string;
}

// reset game by choosing new random word from random word array
function setGame () {
	randomWord = randomWordsList[Math.floor(Math.random() * randomWordsList.length)];

	// fill user guessed arrary with "_"
	for (var i=0; i < randomWord.length; i++) {
		correct.push("_");
	}

	// reset the display
	document.getElementById("text").innerHTML = printArray(correct);
	document.getElementById("guess").innerHTML = "# of Guess Remaining: <br> " + guessRemain;
	document.getElementById("used").innerHTML = "Used Letters: <br>" + printArray(guess);
	document.getElementById("info").style.display = "none";
}

// set the initial game
setGame();

// make the initial "press to play" look flashy
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

// when user press a key
document.onkeyup = function(event) {

	// set initial display, remove flashing info
	if (first) {
		clearInterval(interval);
		first = false;
		document.getElementById("begin").innerHTML = "Wins: " + wins + ", Losses: " + losses;
		document.getElementById("begin").style.display = "initial";
	}

	// if the game end, reset the game
	if (end) {
		end = false;
		guessRemain = 10;
		correct = [];
		guess = [];
		setGame();
	}

	// if not
	else{

		// if the letter user chose is in the random word
		if (randomWord.includes(event.key)) {

			// check the index of the letter in the random word
			for (var i = 0; i < randomWord.length; i++) {

				// replace the "_" with the guessed letter in user guess array
				if (randomWord[i] === event.key) {
					correct[i] = event.key;
				}
			}

			// display the all the guessed letter in the random word
			document.getElementById("text").innerHTML = printArray(correct);

			// if user guess all the letters, increase win score and reset the game
			if (!correct.includes("_")) {
				wins += 1;
				document.getElementById("begin").innerHTML = "Wins: " + wins + ", Losses: " + losses;
				document.getElementById("info").style.display = "initial";
				end = true;
			}
		}

		// if the letter user chose is not in the random word
		else {

			// check if the letter has been guessed
			if (!guess.includes(event.key.toUpperCase())){

				// decrease remaining guess and display the guess
				guess.push(event.key.toUpperCase());
				guessRemain -= 1;
				document.getElementById("used").innerHTML = "Used Letters: <br>" + printArray(guess);
				document.getElementById("guess").innerHTML = "# of Guess Remaining: <br> " + guessRemain;

				// if no more guess left, increase loss and reset the game
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