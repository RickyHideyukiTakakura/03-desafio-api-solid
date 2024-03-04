import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FindManyNearbyParams, OrgsRepository } from "../orgs-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((items) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: items.latitude.toNumber(),
          longitude: items.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
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
