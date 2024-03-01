import { faker } from "@faker-js/faker";
import crypto from "node:crypto";

type Overwrite = {
  password?: string;
};

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.company.name(),
    author_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: overwrite?.password ?? faker.internet.password(),
    zip_code: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
    whatsapp: faker.phone.number(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };
}
