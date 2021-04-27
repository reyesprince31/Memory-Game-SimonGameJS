const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

//----------- Game Pattern ------------ //

document.addEventListener("keydown", () => {
	// console.log(e.key);
	if (!started) {
		document.querySelector("#level__title").innerHTML = `Level ${level}`;
		nextSequence();
		started = true;
	}
});

//-------------- User Pattern -------------//

const buttonSelector = document.querySelectorAll(".btn");
for (let i = 0; i < buttonSelector.length; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", (e) => {
		const userChosenColor = e.target.value;
		console.log("Click: " + userChosenColor);

		userClickedPattern.push(userChosenColor);

		animatePress(userChosenColor, 1);
		playSound(userChosenColor);

		checkAnswer(userClickedPattern.length - 1);
	});
}

//------------ Check if Game and User correct ----------//

const checkAnswer = (currentLevel) => {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			console.log("User Click: " + userClickedPattern);
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");

		console.log("Game Over");

		document.querySelector("body").classList.add("game-over");

		setTimeout(() => {
			document.querySelector("body").classList.remove("game-over");
		}, 200);

		document.querySelector("#level__title").innerHTML =
			"Game Over, Press Any Key To Restart?";

		startOver();
	}
};

//--------- call functions -----------//

const nextSequence = () => {
	userClickedPattern = [];
	level++;
	document.querySelector("#level__title").innerHTML = `Level ${level}`;

	const randomNumber = Math.round(Math.random() * 3);
	const randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	console.log("Random pattern: " + gamePattern);

	animatePress(randomChosenColor, 0);
	playSound(randomChosenColor);
};

const startOver = () => {
	level = 0;
	gamePattern = [];
	started = false;
};

const animatePress = (currentColor, num) => {
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
};

const playSound = (name) => {
	new Audio(`/sounds/${name}.mp3`).play();
};
