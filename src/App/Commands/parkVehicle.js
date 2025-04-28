var ParkVehicle = /** @class */ (function () {
    function ParkVehicle(vehicle, location) {
        this.vehicle = vehicle;
        this.location = location;
    }
    return ParkVehicle;
}());
export { ParkVehicle };
var ParkVehicleHandler = /** @class */ (function () {
    function ParkVehicleHandler(repository) {
        this.repository = repository;
    }
    ParkVehicleHandler.prototype.handle = function (command) {
        var vehicle = this.repository.findById(command.vehicle.id);
        vehicle.parkVehicle(command.location);
        this.repository.save(vehicle);
    };
    return ParkVehicleHandler;
}());
export { ParkVehicleHandler };
