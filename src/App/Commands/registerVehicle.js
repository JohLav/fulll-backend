var RegisterVehicle = /** @class */ (function () {
    function RegisterVehicle(fleetId, userId, vehicle) {
        this.fleetId = fleetId;
        this.userId = userId;
        this.vehicle = vehicle;
    }
    return RegisterVehicle;
}());
export { RegisterVehicle };
var RegisterVehicleHandler = /** @class */ (function () {
    function RegisterVehicleHandler(repository) {
        this.repository = repository;
    }
    RegisterVehicleHandler.prototype.handle = function (command) {
        var fleet = this.repository.findById(command.fleetId);
        fleet.registerVehicle(command.vehicle);
        this.repository.save(fleet);
    };
    return RegisterVehicleHandler;
}());
export { RegisterVehicleHandler };
