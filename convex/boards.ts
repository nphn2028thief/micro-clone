import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const get = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      const boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (query) => query.eq("orgId", args.orgId))
        .order("desc")
        .collect();

      return boards;
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});
