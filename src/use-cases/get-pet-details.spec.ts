import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makePet } from "@/utils/tests/factories/make-pet-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { PetNotFoundError } from "./errors/pet-not-found-error";
import { GetPetDetailsUseCase } from "./get-pet-details";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get pet details", async () => {
    const pet = await petsRepository.create(makePet());

    const result = await sut.execute({ petId: pet.id });

    expect(result.pet.id).toEqual(pet.id);
    expect(result.pet).toEqual(pet);
  });

  it("should not be able to get a non-existing pet", async () => {
    await expect(sut.execute({ petId: "Invalid id" })).rejects.toBeInstanceOf(
      PetNotFoundError
    );
  });
});
