import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { makeOrg } from "tests/factories/make-org-factory";
import { makePet } from "tests/factories/make-pet-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgNotFoundError } from "./errors/org-not-found-error";
import { RegisterPetUseCase } from "./register-pet";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterPetUseCase;

describe("Register Pet Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterPetUseCase(petsRepository, orgsRepository);
  });

  it("should be able to register a new pet", async () => {
    const org = await orgsRepository.create(makeOrg());
    const { pet } = await sut.execute(makePet({ org_id: org.id }));

    expect(petsRepository.items).toHaveLength(1);
    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to register a new pet with a non-existing org", async () => {
    const pet = makePet();

    await petsRepository.create(pet);

    expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
