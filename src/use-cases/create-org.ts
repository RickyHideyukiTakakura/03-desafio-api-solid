import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    zip_code,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      zip_code,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    });

    return { org };
  }
}
