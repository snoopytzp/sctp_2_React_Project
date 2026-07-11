import {useState} from "react";

function GuessInput({ onGuess, disabled }) {
    // Input Value
    const [inputValue, setInputValue] = useState("");
    // event handler
    const inputChangeHandler = (e) => {
        // parse is not a good converter
        const guess = parseInt(e.target.value, 10);
        console.log("input guess", guess);
        if (!isNaN(guess) || e.target.value === "") {
            setInputValue(e.target.value);
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        const guess = parseInt(inputValue, 10);
        if (!isNaN(guess)) {
            onGuess(guess);
            setInputValue("");
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input 
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={inputChangeHandler}
                disabled={disabled}
            />
            <button type="submit" disabled={disabled}>Guess</button>
        </form>
        );
}

export default GuessInput;