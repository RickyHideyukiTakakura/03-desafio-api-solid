import { app } from "@/app";
import { makeOrg } from "@/utils/tests/factories/make-org-factory";
import { makePet } from "@/utils/tests/factories/make-pet-factory";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should get a pet", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(makePet());

    const getPetResponse = await request(app.server)
      .get(`/orgs/pets/${response.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getPetResponse.status).toBe(200);
  });
});
