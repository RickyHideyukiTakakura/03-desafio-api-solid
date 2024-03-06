import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { orgsRoutes } from "./http/controllers/orgs/routes";

export const app = fastify();

// app.register(fastifyJwt, {
//   secret: env.JWT_SECRET,
//   cookie: {
//     cookieName: "refreshToken",
//     signed: false,
//   },
//   sign: {
//     expiresIn: "10min",
//   },
// });

// app.register(fastifyCookie);

app.register(orgsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: ...
  }

  return reply.status(500).send({ message: "Internal Server Error." });
});
