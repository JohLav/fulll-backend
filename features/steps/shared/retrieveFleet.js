import { GetFleet, GetFleetHandler, } from "../../../src/App/Queries/getFleet.js";
export function retrieveFleet(repository, fleetId) {
    var getFleetQuery = new GetFleet(fleetId);
    var handler = new GetFleetHandler(repository);
    return handler.handle(getFleetQuery);
}
