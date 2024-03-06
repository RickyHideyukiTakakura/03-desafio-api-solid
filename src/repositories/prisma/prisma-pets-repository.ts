import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { FindManyParams, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async findMany(params: FindManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          city: {
            contains: params.city,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
