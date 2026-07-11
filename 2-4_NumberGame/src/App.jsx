import { useState } from "react";
import "./App.css";
import GuessStatus from "./components/GuessStatus";
import GuessInput from "./components/GuessInput";
import GuessDisplay from "./components/GuessDisplay";

// function getRandomNumber()
// console.log(getRandomNumber());
// retunr math.floor(Math.random() * 20) + 1;
// lazy involve: 
//const [secretnumer,setsetnumber] = useState(() => getRandomNumber()); //use this if you got arg
//const [secretnumer,setsetnumber] = useState(getRandomNumber);         //Warn: remove the brackets

function getRandomNumber() {
  console.log("Generating a random number...");
  return Math.floor(Math.random() * 20) + 1;
}

function App() {
  const [rndNumber, setRndNumber] = useState(getRandomNumber);
  const [guesses, setGuesses] = useState([]);

  // derived state
  const d_lastGuess = guesses[guesses.length - 1];
  const d_gameWon = d_lastGuess === rndNumber;

  return (
    <div>
      <h1>Guess the Number!</h1>
      <p>Try to guess the number between 1 and 20!</p>
      <GuessStatus 
        lastGuess={d_lastGuess}
        gameWon={d_gameWon}
        correctNumber={rndNumber}
      />
      <GuessInput
        onGuess={(guess) => setGuesses((prevGuesses) => [...prevGuesses, guess])}
        disabled={d_gameWon}
      />
      <GuessDisplay guesses={guesses} secretNumber={rndNumber} />
      {d_gameWon && (
        <button
          onClick={() => {
            setRndNumber(getRandomNumber());
            setGuesses([]);
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;