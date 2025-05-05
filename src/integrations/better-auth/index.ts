import { betterAuth } from "better-auth";
import { serverURL } from "../../utils/environment";

export const betterAuthClient = betterAuth({
 baseURL: serverURL,
 basePath: "/authentications",
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
