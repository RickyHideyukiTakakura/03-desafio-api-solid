import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createOrgBodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string(),
  whatsapp: z.string(),
  password: z.string(),
  zip_code: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBody = createOrgBodySchema.parse(request.body);

  const createOrgUseCase = makeCreateOrgUseCase();

  await createOrgUseCase.execute(createOrgBody);

  return reply.status(201).send();
}
