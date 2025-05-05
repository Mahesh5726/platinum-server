import { betterAuth } from "better-auth";
import { serverURL } from "../../utils/environment";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma";

export const betterAuthClient = betterAuth({
 baseURL: serverURL,
 basePath: "/authentications",
 database: prismaAdapter(prismaClient, { provider: "postgresql" }),
 user: {
  modelName: "User",
 },
 session: {
  modelName: "Session",
 },
 account: {
  modelName: "Account",
 },
 verification: {
  modelName: "Verification",
 },
});
