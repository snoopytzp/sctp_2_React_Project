import {useState} from "react";

function GuessDisplay({ guesses, secretNumber }) {
    // If there are no guesses, don't render the list at all.
    if (guesses.length == 0)
    {
        console.log("No guesses yet, returning null.");
        return null;
    } 

    console.log("Rendering GuessDisplay with guesses:", guesses.length, "and secretNumber:", secretNumber);

    return (
        <div>
            <h2>Previous Guesses</h2>
            <ul>
                {guesses.map((guess, index) => (
                    <li key={index}>
                        {guess} - {guess === secretNumber ? "Correct!" : guess < secretNumber ? "Too low" : "Too high"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GuessDisplay;