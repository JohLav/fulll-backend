import { VehicleAlreadyRegisteredError } from "../Errors/VehicleAlreadyRegisteredError.js";
import { randomUUID } from "node:crypto";
// Aggregate root
var Fleet = /** @class */ (function () {
    function Fleet(id, userId, vehicles) {
        if (vehicles === void 0) { vehicles = []; }
        this.id = id;
        this.userId = userId;
        this.vehicles = vehicles;
    }
    Fleet.initializeFleet = function (userId) {
        return new Fleet(randomUUID(), userId, []);
    };
    Fleet.prototype.registerVehicle = function (vehicle) {
        if (this.vehicles.some(function (v) { return v.equals(vehicle); })) {
            throw new VehicleAlreadyRegisteredError(vehicle.id);
        }
        this.vehicles.push(vehicle);
    };
    return Fleet;
}());
export { Fleet };
