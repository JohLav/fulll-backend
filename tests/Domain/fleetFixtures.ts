import { Vehicle } from "../../src/Domain/Models/Vehicle";
import { Location } from "../../src/Domain/Models/Location";
import { Fleet } from "../../src/Domain/Models/Fleet";

export function fleet() {
  return Fleet.create("7ed14d0d-6401-4b81-a06b-de9655e6f29e", "2345", [
    vehicleAWithoutLocation(),
    vehicleB(),
    vehicleC(),
  ]);
}

export function updatedFleet() {
  return Fleet.create("7ed14d0d-6401-4b81-a06b-de9655e6f29e", "2345", [
    vehicleAWithLocation(),
    vehicleB(),
    vehicleC(),
  ]);
}

export function vehicleAWithoutLocation() {
  return Vehicle.create("AD-5648-MN");
}

export function vehicleAWithLocation() {
  return Vehicle.create("AD-5648-MN", Location.create(35.1234, 3.4567));
}

export function vehicleB() {
  return Vehicle.create("BG-5147-AD", Location.create(34.9999, 7.0978));
}

export function vehicleC() {
  return Vehicle.create("GE-1234-TD", Location.create(48.8566, 2.3522, 105));
}
