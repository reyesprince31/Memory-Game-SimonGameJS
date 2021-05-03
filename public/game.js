const buttonColors = ["red", "blue", "green", "yellow"];
const soundLists = ["5loop", "go", "wrong", ...buttonColors];
const randomNumber = Math.round(Math.random() * 3);
const randomChosenColor = buttonColors[randomNumber];

let userClickedPattern = [];
let gamePattern = [];
let gameArray = gamePattern - gamePattern;
let started;
let level;
let loopCounter;
let countdown;
let disableBtn;
let gameStart;
let readyCount;
let loaded = true;

const levelTitle = document.querySelector("#level__title");
const buttonStart = document.querySelector("#start__button");
const buttonSelector = document.querySelectorAll(".btn");
const bodySelector = document.querySelector("body");

function firstLoad() {
	for (let i = 0; i < buttonSelector.length; i++) {
		//1.) onLoad disable buttons
		disableBtn = buttonSelector[i].disabled = true;
	}

	for (let i = 0; i < soundLists.length; i++) {
		new Audio(`/public/sounds/${soundLists[i]}.mp3`);
		console.log("Preload");
	}
}

gameComence(buttonStart); //2.) button start

function gameComence() {
	//3.) verifiy before execution

	buttonStart.addEventListener("click", () => {
		//3.b) when buttonStart click, execute!
		buttonStart.disabled = true;
		loaded = false;

		if (buttonStart.innerHTML === "Restart") {
			//3.c) if buttonStart = "Restart"
			startOver();
		}

		if (!started) {
			//3.d) if started is not true,
			gameArray = 0;
			level = 0;
			countdown = 4;
			started = true;
			gameStart = false;
			loopCounter = false;

			readyCount = setInterval(() => {
				//4.) before execution, another verification.
				levelTitle.innerHTML = `Game starts in ${--countdown}`;

				if (countdown >= 1) {
					playSound("5loop");
				} else {
					playSound("go");
				}

				if (countdown <= 0) {
					//unlock all buttons and execute

					buttonStart.disabled = gameStart;
					buttonStart.innerHTML = "Restart";

					nextSequence();
					clearInterval(readyCount);
				}
			}, 1000);
		}
	});
}

function buttonUnlock(gameStart) {
	for (let i = 0; i < buttonSelector.length; i++) {
		disableBtn = buttonSelector[i].disabled = gameStart;
	}
}

function nextSequence() {
	setTimeout(() => {
		userClickedPattern = [];

		levelTitle.innerHTML = `Game Level: ${level + 1}`;
		if (level === 0) {
			start();
		}

		loop(level);

		loopCounter = true;
		level++;
		gameArray++;
	}, 800);
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
async function loop(level) {
	if (loopCounter) {
		level++;
		for (let i = 0; i < level; i++) {
			animatePress(gamePattern[i], 0);

			playSound(gamePattern[i]);

			await timer(800);
		}
		buttonStart.disabled = false;

		buttonUnlock(gameStart);
	} else {
		animatePress(gamePattern[level], 0);

		playSound(gamePattern[level]);

		buttonUnlock(gameStart);
	}
}

function start() {
	for (let i = 0; i < 20; i++) {
		gamePattern.push(buttonColors[Math.round(Math.random() * 3)]);
	}
}

for (let i = 0; i < buttonSelector.length; i++) {
	buttonSelector[i].addEventListener("click", (e) => {
		let userChosenColor = e.target.value;

		userClickedPattern.push(userChosenColor);

		animatePress(userChosenColor, 1);
		playSound(userChosenColor);

		checkAnswer(userClickedPattern.length - 1);
	});
}

const checkAnswer = (currentLevel) => {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gameArray) {
			if (userClickedPattern.length === gamePattern.length) {
				levelTitle.innerHTML = "Congrats you beat highest Level!";
				firstLoad();
				level++;
				gameArray--;
			} else {
				levelTitle.innerHTML = "Correct!";
				firstLoad();
				buttonStart.disabled = true;

				setTimeout(() => {
					nextSequence();
				}, 1000);
			}
		}
	} else {
		gameStart = true;
		playSound("wrong");

		buttonStart.innerHTML = "Start";

		levelTitle.innerHTML = `GameOver (Your Score: ${level - 1})`;

		bodySelector.classList.add("game-over");

		setTimeout(() => {
			bodySelector.classList.remove("game-over");
		}, 200);

		firstLoad();
		startOver();
	}
};

function startOver() {
	gamePattern = [];
	userClickedPattern = [];
	started = false;
	loopCounter = false;
	level;
	gameArray;
	gameStart;
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
	// var audio = new Audio(
	// 	`https://github.com/reyesprince31/Memory-Game-SimonGameJS/tree/main/sounds/${name}`
	// );
	// audio.play();

	const audio = new Audio(`/public/sounds/${name}.mp3`);
	audio.play();

	console.log(audio);
}
