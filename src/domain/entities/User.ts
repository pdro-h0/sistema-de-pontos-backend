import { randomUUID } from "node:crypto";
import { Role } from "../enums/Role";

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly role: Role
  ) {}

  static create(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) {
    const id = randomUUID();
    return new User(id, data.name, data.email, data.password, data.role);
  }
}
