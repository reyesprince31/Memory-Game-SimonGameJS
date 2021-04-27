const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

const nextSequence = () => {
	const randomNumber = Math.round(Math.random() * 3);
	const randomChosenColor = buttonColors[randomNumber];

	console.log(randomChosenColor);

	gamePattern.push(randomChosenColor);

	console.log(gamePattern);
};

const buttonSelector = document.querySelectorAll(".btn");

for (let i = 0; i < buttonSelector.length; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", (e) => {
		const userChosenColor = e.target.value;
		console.log(userChosenColor);

		userClickedPattern.push(userChosenColor);
		console.log(userClickedPattern);
	});
}
