import { app } from "@/app";
import { makeOrg } from "@/utils/tests/factories/make-org-factory";
import { makePet } from "@/utils/tests/factories/make-pet-factory";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new pet", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server).post("/sessions").send({
      email: org.email,
      password: org.password,
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(makePet());

    expect(response.status).toBe(201);
  });
});
