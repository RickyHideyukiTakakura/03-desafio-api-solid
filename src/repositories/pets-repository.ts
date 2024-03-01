import { Pet, Prisma } from "@prisma/client";

export interface FindManyParams {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  independence_level?: string;
  environment?: string;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findMany(params: FindManyParams): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
