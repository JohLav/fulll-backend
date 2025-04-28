import { LocationNotFoundError } from "../Errors/LocationNotFoundError.js";
import { VehicleNotFoundError } from "../Errors/VehicleNotFoundError.js";
var GetLocation = /** @class */ (function () {
    function GetLocation(vehicleId) {
        this.vehicleId = vehicleId;
    }
    return GetLocation;
}());
export { GetLocation };
var GetLocationHandler = /** @class */ (function () {
    function GetLocationHandler(repository) {
        this.repository = repository;
    }
    GetLocationHandler.prototype.handle = function (getLocationQuery) {
        var vehicle = this.repository.findById(getLocationQuery.vehicleId);
        if (!vehicle) {
            throw new VehicleNotFoundError(getLocationQuery.vehicleId);
        }
        if (!vehicle.location) {
            throw new LocationNotFoundError(getLocationQuery.vehicleId);
        }
        return vehicle.location;
    };
    return GetLocationHandler;
}());
export { GetLocationHandler };
