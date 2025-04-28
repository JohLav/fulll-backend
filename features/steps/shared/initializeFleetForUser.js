import { InitializeFleet, InitializeFleetHandler, } from "../../../src/App/Commands/initializeFleet.js";
export function initializeFleetForUser(repository, user) {
    var initializeFleet = new InitializeFleet(user.id);
    var handler = new InitializeFleetHandler(repository);
    return handler.handle(initializeFleet);
}
