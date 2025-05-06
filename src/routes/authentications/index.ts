import { betterAuthClient } from "../../integrations/better-auth";
import { createUnsecureRoute } from "../middlewares/session-middleware";

export const authenticationsRoutes = createUnsecureRoute();

authenticationsRoutes.use((c) => {
  return betterAuthClient.handler(c.req.raw);
});
