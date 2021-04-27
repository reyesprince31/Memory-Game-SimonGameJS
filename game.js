const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", () => {
	// console.log(e.key);
	if (!started) {
		nextSequence();
		document.querySelector("#level__title").innerHTML = `Level ${level}`;
		started = true;
	}
});

const nextSequence = () => {
	userClickedPattern = [];
	const randomNumber = Math.round(Math.random() * 3);
	const randomChosenColor = buttonColors[randomNumber];

	// console.log(randomChosenColor);
	gamePattern.push(randomChosenColor);

	console.log("Random pattern: " + gamePattern);

	animatePress(randomChosenColor, 0);
	playSound(randomChosenColor);

	level++;
	//document.querySelector("#level__title").innerHTML = `Level ${level}`;
};

const buttonSelector = document.querySelectorAll(".btn");
//console.log(buttonSelector);
for (let i = 0; i < buttonSelector.length; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", (e) => {
		const userChosenColor = e.target.value;
		// console.log(userChosenColor);
		userClickedPattern.push(userChosenColor);
		console.log("User Click: " + userClickedPattern);

		animatePress(userChosenColor, 1);
		playSound(userChosenColor);

		checkAnswer(userClickedPattern.length - 1);
	});
}

const checkAnswer = (currentLevel) => {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");

		if (userClickedPattern.length === gamePattern.length) {
			console.log("ahhhhhhh");
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
	}
};

const animatePress = (currentColor, num) => {
	const elements = document.querySelectorAll(`.box__${currentColor}`);
	const result = elements[num].classList;

	if (num === 0) {
		result.add("pressed");

		setTimeout(() => {
			result.remove("pressed");
		}, 300);
	}
	if (num === 1) {
		result.add("pressed");

		setTimeout(() => {
			result.remove("pressed");
		}, 300);
	}
};

const playSound = (name) => {
	const audio = new Audio(`/sounds/${name}.mp3`);
	audio.play();
};
