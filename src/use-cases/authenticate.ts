import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await bcrypt.compare(password, org.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
