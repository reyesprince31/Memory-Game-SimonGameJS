const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];

const nextSequence = () => {
	const randomNumber = Math.round(Math.random() * 3);
	const randomChosenColor = buttonColors[randomNumber];

	console.log(randomChosenColor);

	gamePattern.push(randomChosenColor);

	console.log(gamePattern);
};
