import { RegisterVehicle, RegisterVehicleHandler, } from "../../../src/App/Commands/registerVehicle.js";
export function registerVehicleInFleet(repository, fleetId, userId, vehicle) {
    var registerCommand = new RegisterVehicle(fleetId, userId, vehicle);
    var handler = new RegisterVehicleHandler(repository);
    handler.handle(registerCommand);
}
