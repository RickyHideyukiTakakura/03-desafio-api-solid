import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { details } from "./details";
import { register } from "./register";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJWT] }, register);
  app.get("/orgs/pets", search);
  app.get("/orgs/pets/:id", details);
}
