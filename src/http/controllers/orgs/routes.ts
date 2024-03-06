import { FastifyInstance } from "fastify";

import { create } from "./create";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
  // app.post('/orgs/authenticate', authenticateOrgController)
  // app.get('/orgs/nearby', fetchNearbyOrgsController)
}
