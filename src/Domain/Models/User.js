import { randomUUID } from "node:crypto";
var User = /** @class */ (function () {
    function User(id) {
        this.id = id;
    }
    User.create = function () {
        return new User(randomUUID());
    };
    return User;
}());
export { User };
