import { randomUUID } from "node:crypto";
var Vehicle = /** @class */ (function () {
    function Vehicle(id, type, location) {
        this.id = id;
        this.type = type;
        this.location = location;
    }
    Vehicle.create = function (type) {
        return new Vehicle(randomUUID(), type);
    };
    Vehicle.prototype.equals = function (other) {
        return this.id === other.id;
    };
    Vehicle.prototype.parkVehicle = function (location) {
        this.location = location;
    };
    return Vehicle;
}());
export { Vehicle };
