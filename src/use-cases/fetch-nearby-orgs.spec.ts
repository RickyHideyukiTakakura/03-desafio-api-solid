import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "tests/factories/make-org-factory";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyOrgsUseCase } from "./fetch-nearby-orgs";

let orgsRepository: InMemoryOrgsRepository;
let sut: FetchNearbyOrgsUseCase;

describe("Fetch Nearby Orgs Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchNearbyOrgsUseCase(orgsRepository);
  });

  it("should be able to fetch nearby gyms ", async () => {
    const org = await orgsRepository.create(makeOrg());

    const { orgs } = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    });

    expect(orgs).toHaveLength(1);
    expect(orgs).toEqual([org]);
  });
});
