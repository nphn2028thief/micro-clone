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
    const orgId = args.orgId;
    const title = args.title.trim();

    if (!orgId || !title) {
      throw new ConvexError("Invalid data!");
    }

    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      const existBoard = await ctx.db
        .query("boards")
        .withIndex("by_org", (query) => query.eq("orgId", args.orgId))
        .order("desc")
        .collect();

      const adjustedTitle = existBoard
        ? `${args.title} ${existBoard.length + 1}`
        : `${args.title} 1`;

      const randomImage = images[Math.floor(Math.random() * images.length)];

      const createdBoard = await ctx.db.insert("boards", {
        title: adjustedTitle,
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

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  async handler(ctx, args) {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      const updatedBoard = await ctx.db.patch(args.id, {
        title: args.title,
      });

      return updatedBoard;
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  async handler(ctx, args) {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      await ctx.db.delete(args.id);
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});
