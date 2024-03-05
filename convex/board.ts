import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  async handler(ctx, args) {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      const randomImage = images[Math.floor(Math.random() * images.length)];

      const createdBoard = await ctx.db.insert("boards", {
        title: args.title,
        orgId: args.orgId,
        authorId: userIdentity.subject,
        authorName: userIdentity.name!,
        imageUrl: randomImage,
      });

      return createdBoard;
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});
