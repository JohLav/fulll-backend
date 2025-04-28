import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";
var GetFleet = /** @class */ (function () {
    function GetFleet(fleetId) {
        this.fleetId = fleetId;
    }
    return GetFleet;
}());
export { GetFleet };
var GetFleetHandler = /** @class */ (function () {
    function GetFleetHandler(repository) {
        this.repository = repository;
    }
    GetFleetHandler.prototype.handle = function (getFleetQuery) {
        var fleet = this.repository.findById(getFleetQuery.fleetId);
        if (!fleet) {
            throw new FleetNotFoundError(getFleetQuery.fleetId);
        }
        return fleet;
    };
    return GetFleetHandler;
}());
export { GetFleetHandler };
