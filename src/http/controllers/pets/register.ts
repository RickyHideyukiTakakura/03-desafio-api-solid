import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";
import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const registerPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  independence_level: z.string(),
  environment: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBody = registerPetBodySchema.parse(request.body);

  const registerPetUseCase = makeRegisterPetUseCase();

  try {
    const { pet } = await registerPetUseCase.execute({
      ...registerPetBody,
      org_id: request.user.sub,
    });

    return reply.status(201).send(pet);
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
