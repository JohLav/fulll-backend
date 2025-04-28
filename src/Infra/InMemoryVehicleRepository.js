// Secondary Adapter
var InMemoryVehicleRepository = /** @class */ (function () {
    function InMemoryVehicleRepository() {
        this.vehicles = new Map();
    }
    InMemoryVehicleRepository.prototype.save = function (vehicle) {
        this.vehicles.set(vehicle.id, vehicle);
    }; // TODO: method to keep?
    InMemoryVehicleRepository.prototype.findById = function (vehicleId) {
        return this.vehicles.get(vehicleId);
    };
    InMemoryVehicleRepository.prototype.findByUserId = function (userId) {
        return this.vehicles.get(userId);
    };
    return InMemoryVehicleRepository;
}());
export { InMemoryVehicleRepository };
