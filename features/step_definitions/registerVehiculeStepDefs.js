import {Given, Then, When} from "@cucumber/cucumber";
import assert from "node:assert";

Given('my fleet', function () {
    const initializeFleetCommand = new InitializeFleetCommand();
    const fleet = initializeFleetCommand.handle();
});

Given('a vehicle', function () {
    throw new Error("Not implemented")
});

When('I register this vehicle into my fleet', function () {
    throw new Error("Not implemented")
});

Then('this vehicle should be part of my vehicle fleet', function () {
    throw new Error("Not implemented")
});
