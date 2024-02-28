import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = [];

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      ...data,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(org);

    return org;
  }
}
