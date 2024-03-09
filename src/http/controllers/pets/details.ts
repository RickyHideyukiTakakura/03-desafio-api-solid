import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";
import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const getPetDetailsRouteSchema = z.object({
  id: z.string(),
});

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const { id } = getPetDetailsRouteSchema.parse(request.params);

  const getPetUseCase = makeGetPetDetailsUseCase();

  try {
    const { pet } = await getPetUseCase.execute({ petId: id });

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
}
