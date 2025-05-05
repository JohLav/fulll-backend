import { expect, test } from "vitest";
import { BUZZ, FIZZ, FIZZBUZZ, fizzBuzz } from "./fizzBuzz.js";

test.each([
  [1, "1"],
  [2, "2"],
  [7, "7"],
  [0, FIZZBUZZ],
  [-3, FIZZ],
  [-5, BUZZ],
  [-15, FIZZBUZZ],
])("should return %s with input %i", (input, expected) => {
  expect(fizzBuzz(input)).toBe(expected);
});

test.each([[3], [6], [9], [-3]])(
  'should return "Fizz" with input %i',
  (input) => {
    expect(fizzBuzz(input)).toBe(FIZZ);
  },
);

test.each([[5], [10], [-5]])('should return "Buzz" for input %i', (input) => {
  expect(fizzBuzz(input)).toBe(BUZZ);
});

test.each([[15], [30], [-15]])(
  'should return "FizzBuzz" for input %i',
  (input) => {
    expect(fizzBuzz(input)).toBe("FizzBuzz");
  },
);

test("should handle large multiples correctly", () => {
  expect(fizzBuzz(3000)).toBe("FizzBuzz");
});

test("should throw an error for non-numeric input", () => {
  expect(() => fizzBuzz(NaN)).toThrow("Invalid input");
});
