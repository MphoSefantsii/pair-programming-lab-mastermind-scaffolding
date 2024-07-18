// https://jsdoc.app
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the guess
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - a string representing the number of correct numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532', '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  let correctPosition = 0;
  let correctDigitWrongPosition = 0;

  const secretCount = {};
  const guessCount = {};

  // First pass: Count correct positions
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === guess[i]) {
      correctPosition++;
    } else {
      // Count digits for later use
      secretCount[solution[i]] = (secretCount[solution[i]] || 0) + 1;
      guessCount[guess[i]] = (guessCount[guess[i]] || 0) + 1;
    }
  }

  // Second pass: Count correct digits in wrong positions
  for (const digit in guessCount) {
    if (secretCount[digit]) {
      correctDigitWrongPosition += Math.min(secretCount[digit], guessCount[digit]);
    }
  }

  return `${correctPosition}-${correctDigitWrongPosition}`;
}

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */
function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
const [solution, guessCount, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = processInput(solution, guesses);
console.log(output.join(" "));
