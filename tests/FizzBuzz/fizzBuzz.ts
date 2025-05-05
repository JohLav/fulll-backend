export const FIZZ = "Fizz";
export const BUZZ = "Buzz";
export const FIZZBUZZ = "FizzBuzz";

export function fizzBuzz(input: number): string {
  if (isNaN(input)) {
    throw new Error("Invalid input");
  }

  if (isMultipleOf3And5(input)) return FIZZBUZZ;
  if (isMultipleOf3(input)) return FIZZ;
  if (isMultipleOf5(input)) return BUZZ;
  return input.toString();
}

function isMultipleOf3And5(input: number) {
  return isMultipleOf3(input) && isMultipleOf5(input);
}

function isMultipleOf3(input: number) {
  return input % 3 === 0;
}

function isMultipleOf5(input: number) {
  return input % 5 === 0;
}
