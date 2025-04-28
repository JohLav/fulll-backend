// Secondary Adapter
var InMemoryFleetRepository = /** @class */ (function () {
    function InMemoryFleetRepository() {
        this.fleets = new Map();
    }
    InMemoryFleetRepository.prototype.save = function (fleet) {
        this.fleets.set(fleet.id, fleet);
    };
    InMemoryFleetRepository.prototype.findById = function (fleetId) {
        return this.fleets.get(fleetId);
    };
    InMemoryFleetRepository.prototype.findByUserId = function (userId) {
        return this.fleets.get(userId);
    };
    return InMemoryFleetRepository;
}());
export { InMemoryFleetRepository };
