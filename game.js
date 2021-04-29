const buttonColors = ["red", "blue", "green", "yellow"];
const randomNumber = Math.round(Math.random() * 3);
const randomChosenColor = buttonColors[randomNumber];

let gamePattern = [];
let gameArray = gamePattern - gamePattern;
let userClickedPattern = [];
let started;
let level;
let loopCounter;
let countdown;
let disableBtn;
let gameStart;

const levelTitle = document.querySelector("#level__title");
const buttonStart = document.querySelector("#start__button");
const buttonSelector = document.querySelectorAll(".btn");
const bodySelector = document.querySelector("body");

for (let i = 0; i < buttonSelector.length; i++) {
	disableBtn += buttonSelector[i].disabled = true;
}

function buttonUnlock(gameStart) {
	for (let i = 0; i < buttonSelector.length; i++) {
		disableBtn += buttonSelector[i].disabled = gameStart;
	}
}

gameComence(buttonStart);

function gameComence() {
	buttonStart.addEventListener("click", () => {
		if (buttonStart.innerHTML === "Restart") {
			startOver();
		}

		if (!started) {
			gameArray = 0;
			level = 0;
			countdown = 6;
			started = true;
			gameStart = false;
			loopCounter = false;

			let readyCount = setInterval(() => {
				levelTitle.innerHTML = `Game starts in ${--countdown}`;

				if (countdown <= 0) {
					nextSequence();
					clearInterval(readyCount);
				}
			}, 1000);

			buttonStart.innerHTML = "Restart";
		}
	});
}

function nextSequence() {
	setTimeout(() => {
		gameArray++;
		userClickedPattern = [];
		levelTitle.innerHTML = `Game Level: ${level + 1}`;
		if (level === 0) {
			start();
		}

		loop(level);
		loopCounter = true;
		level++;
		buttonUnlock(gameStart);
	}, 800);
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
async function loop(level) {
	console.log("current level in loop: " + level);
	console.log("Game:" + gameArray);
	if (loopCounter) {
		level++;
		for (let i = 0; i < level; i++) {
			console.log("loop Count " + i);
			// console.log("in for loop: " + level);
			// console.log("in for Game:" + gameArray);
			animatePress(gamePattern[i], 0);

			playSound(gamePattern[i]);

			await timer(800);
		}
	} else {
		animatePress(gamePattern[level], 0);

		playSound(gamePattern[level]);
	}
}

function start() {
	for (let i = 0; i < 20; i++) {
		gamePattern.push(buttonColors[Math.round(Math.random() * 3)]);
	}
	console.log(gamePattern);
	console.log(gamePattern[level]);
}

for (let i = 0; i < buttonSelector.length; i++) {
	buttonSelector[i].addEventListener("click", (e) => {
		let userChosenColor = e.target.value;
		console.log("Click: " + userChosenColor);

		userClickedPattern.push(userChosenColor);

		animatePress(userChosenColor, 1);
		playSound(userChosenColor);

		checkAnswer(userClickedPattern.length - 1);
	});
}

const checkAnswer = (currentLevel) => {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		// console.log("correct");
		// console.log("checkAnswer " + gameArray);

		if (userClickedPattern.length === gameArray) {
			console.log("User Click: " + userClickedPattern);

			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		gameStart = true;
		playSound("wrong");

		console.log("Game Over");
		buttonStart.innerHTML = "Start";

		bodySelector.classList.add("game-over");

		setTimeout(() => {
			bodySelector.classList.remove("game-over");
		}, 200);

		startOver();
	}
};

function startOver() {
	levelTitle.innerHTML = `GameOver (Your Score: ${level - 1})`;
	gamePattern = [];
	userClickedPattern = [];
	started = false;
	loopCounter = false;
	level;
	gameArray;
	buttonUnlock(gameStart);
}

function animatePress(currentColor, num) {
	const elements = document.querySelectorAll(`.box__${currentColor}`);
	const result = elements[num].classList;

	if (num === 0) {
		result.add("pressed");

		setTimeout(() => {
			result.remove("pressed");
		}, 100);
	}
	if (num === 1) {
		result.add("pressed");

		setTimeout(() => {
			result.remove("pressed");
		}, 100);
	}
}

function playSound(name) {
	new Audio(`/sounds/${name}.mp3`).play();
}
