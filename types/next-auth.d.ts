import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    _id: string
    role: string
    provider: string
    name: string;
    email: string;
    password?: string;
    image?: string;
    role?: string;
    provider?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  interface Session {
    user: User & {
      _id: string
      role: string
      provider: string
    }
    token: {
      _id: string
      role: string
      provider: string
    }
  }
}