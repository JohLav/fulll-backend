// Value Object
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    Location.create = function (latitude, longitude) {
        return new Location(latitude, longitude);
    };
    Location.prototype.equals = function (other) {
        if (!other)
            return false;
        return (this.latitude === other.latitude && this.longitude === other.longitude);
    };
    return Location;
}());
export { Location };
