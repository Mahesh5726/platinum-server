import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { createSecureRoute } from "../middlewares/session-middleware";
import { prismaClient } from "../../integrations/prisma";

export const postsRoute = createSecureRoute();

postsRoute.post(
  "",
  zValidator(
    "json",
    z.object({
      text: z.string().min(1, "Only non-empty text is allowed"),
    })
  ),
  async (context) => {
    const user = context.get("user");
    const { text } = context.req.valid("json");

    const post = await prismaClient.post.create({
      data: {
        text: text,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });

    return context.json(post, 201);
  }
);

postsRoute.get("/:postId", async (context) => {
  const { postId } = context.req.param();

  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    throw new HTTPException(404);
  }

  return context.json(post, 200);
});
