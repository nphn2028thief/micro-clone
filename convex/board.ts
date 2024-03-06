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

      const userId = userIdentity.subject;

      const existingFavorite = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", args.id)
        )
        .unique();

      if (existingFavorite) {
        await ctx.db.delete(existingFavorite._id);
      }

      await ctx.db.delete(args.id);
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});

export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const id = args.id;
    const orgId = args.orgId;

    if (!id || !orgId) {
      return new ConvexError("Invalid data!");
    }

    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      const board = await ctx.db.get(args.id);

      if (!board) {
        return new ConvexError("Board not found!");
      }

      const userId = userIdentity.subject;

      const existingFavorite = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id)
        )
        .unique();

      if (existingFavorite) {
        throw new ConvexError("Board already favorited!");
      }

      await ctx.db.insert("userFavorites", {
        userId,
        orgId,
        boardId: board._id,
      });
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});

export const unfavorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const id = args.id;
    const orgId = args.orgId;

    if (!id || !orgId) {
      return new ConvexError("Invalid data!");
    }

    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      const board = await ctx.db.get(args.id);

      if (!board) {
        return new ConvexError("Board not found!");
      }

      const userId = userIdentity.subject;

      const existingFavorite = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id)
        )
        .unique();

      if (!existingFavorite) {
        throw new ConvexError("Favorited board not found!");
      }

      await ctx.db.delete(existingFavorite._id);
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});
