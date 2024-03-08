import { app } from "@/app";
import { makeOrg } from "@/utils/tests/factories/make-org-factory";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should authenticate an org", async () => {
    const org = makeOrg();

    await request(app.server).post("/orgs").send(org);

    const response = await request(app.server).post("/sessions").send({
      email: org.email,
      password: org.password,
    });

    expect(response.status).toBe(200);

    expect(response.body.token).toEqual(expect.any(String));
  });
});
