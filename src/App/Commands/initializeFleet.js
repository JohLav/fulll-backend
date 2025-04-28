import { Fleet } from "../../Domain/Models/Fleet.js";
var InitializeFleet = /** @class */ (function () {
    function InitializeFleet(userId) {
        this.userId = userId;
    }
    return InitializeFleet;
}());
export { InitializeFleet };
var InitializeFleetHandler = /** @class */ (function () {
    function InitializeFleetHandler(repository) {
        this.repository = repository;
    }
    InitializeFleetHandler.prototype.handle = function (command) {
        var fleet = Fleet.initializeFleet(command.userId);
        this.repository.save(fleet);
        return fleet.id;
    };
    return InitializeFleetHandler;
}());
export { InitializeFleetHandler };
