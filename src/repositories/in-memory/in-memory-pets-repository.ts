import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FindManyParams, PetsRepository } from "../pets-repository";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findMany(params: FindManyParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
    );

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true
      );

    return pets;
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      ...data,
    };

    this.items.push(pet);

    return pet;
  }
}
