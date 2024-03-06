import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "@/utils/tests/factories/make-org-factory";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    const password = "123456";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) })
    );

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password,
    });

    expect(authenticatedOrg).toEqual(org);
  });

  it("should not be able to authenticate with wrong email ", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password ", async () => {
    const password = "123456";

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) })
    );

    await expect(() =>
      sut.execute({
        email: org.email,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
