import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { OrgNotFoundError } from "./errors/org-not-found-error";

interface RegisterPetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energy_level: string;
  independence_level: string;
  environment: string;
  org_id: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      org_id,
    });

    return { pet };
  }
}
