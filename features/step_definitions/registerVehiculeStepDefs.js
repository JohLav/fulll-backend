import {Then, When} from "@cucumber/cucumber";
import assert from "node:assert";

When('I add {int} and {int}', function (member1, member2) {
    this.result = member1 + member2;
});

Then('The result is {int}', function (expectedAnswer) {
    assert.equal(this.result, expectedAnswer);
});
