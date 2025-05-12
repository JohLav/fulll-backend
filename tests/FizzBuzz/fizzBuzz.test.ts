import { describe, expect, it } from "vitest";
import { fizzBuzz } from "./fizzBuzz.js";

const FIZZ = "Fizz";
const BUZZ = "Buzz";
const FIZZBUZZ = "FizzBuzz";

describe("fizzBuzz", () => {
  it.each([
    [1, "1"],
    [2, "2"],
    [7, "7"],
  ])("should return %s with input %i", (input, expected) => {
    expect(fizzBuzz(input)).toBe(expected);
  });

  it.each([
    [3, FIZZ],
    [6, FIZZ],
    [9, FIZZ],
  ])('should return "Fizz" with input %i', (input) => {
    expect(fizzBuzz(input)).toBe(FIZZ);
  });

  it.each([
    [5, BUZZ],
    [10, BUZZ],
  ])('should return "Buzz" for input %i', (input) => {
    expect(fizzBuzz(input)).toBe(BUZZ);
  });

  it.each([
    [15, FIZZBUZZ],
    [30, FIZZBUZZ],
    [3000, FIZZBUZZ],
  ])('should return "FizzBuzz" for input %i', (input) => {
    expect(fizzBuzz(input)).toBe("FizzBuzz");
  });
});
