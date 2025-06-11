const FIZZ = "Fizz";
const BUZZ = "Buzz";
const FIZZBUZZ = "FizzBuzz";

export const fizzBuzz = (input: number): string => {
  if (isMultipleOf15(input)) return FIZZBUZZ;
  if (isMultipleOf3(input)) return FIZZ;
  if (isMultipleOf5(input)) return BUZZ;
  return input.toString();
};

const isMultipleOf =
  (divisor: number) =>
  (input: number): boolean =>
    input % divisor === 0;
const isMultipleOf3 = isMultipleOf(3);
const isMultipleOf5 = isMultipleOf(5);
const isMultipleOf15 = (input: number): boolean =>
  isMultipleOf3(input) && isMultipleOf5(input);
