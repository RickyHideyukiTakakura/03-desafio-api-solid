import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { create } from "./create";
import { nearby } from "./nearby";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
  app.post("/sessions", authenticate);
  app.get("/orgs/nearby", nearby);
}
