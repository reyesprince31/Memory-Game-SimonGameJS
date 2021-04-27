const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

const nextSequence = () => {
	const randomNumber = Math.round(Math.random() * 3);
	const randomChosenColor = buttonColors[randomNumber];

	console.log(randomChosenColor);

	gamePattern.push(randomChosenColor);

	console.log(gamePattern);

	animatePress(randomChosenColor, 0);
	playSound(randomChosenColor);
};

const buttonSelector = document.querySelectorAll(".btn");

for (let i = 0; i < buttonSelector.length; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", (e) => {
		const userChosenColor = e.target.value;
		console.log(userChosenColor);

		userClickedPattern.push(userChosenColor);
		console.log(userClickedPattern);

		animatePress(userChosenColor, 1);
		playSound(userChosenColor);
	});
}

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
