import {Given, Then, When} from "@cucumber/cucumber";
import {InitializeFleet, InitializeFleetHandler} from "../../src/App/Commands/initializeFleet.js";

Given('my fleet', function () {
    const initializeFleet = new InitializeFleet();
    const handler = new InitializeFleetHandler();
    handler.handle(initializeFleet);
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
