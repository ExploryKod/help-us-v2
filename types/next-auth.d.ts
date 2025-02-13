import NextAuth from "next-auth"
import { UserRolesEnum } from "./IUser";

declare module "next-auth" {
  interface User {
    _id: string
    firstName: string
    lastName: string
    name: string;
    email: string;
    password?: string;
    image?: string;
    role?: UserRolesEnum | string;
    provider?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  interface Session {
    user: User & {
      _id: string
      role: UserRolesEnum
      provider: string
    }
    token: {
      _id: string
      role: UserRolesEnum
      provider: string
    }
  }
}