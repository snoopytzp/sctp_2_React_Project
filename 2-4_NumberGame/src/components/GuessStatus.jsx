//import {useState} from "react";

function GuessStatus({ lastGuess, gameWon, correctNumber }) {
    let message = "Make your first guess!";

    if (lastGuess !== undefined) {
        if (gameWon) {
            message = "Congratulations! You guessed the number!";
        } else if (lastGuess == undefined) {
            message = lastGuess < correctNumber ? "Too low!" : "Too high!";
        }
    }

    return <p>{message}</p>;
}

export default GuessStatus;