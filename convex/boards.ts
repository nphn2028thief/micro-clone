import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorite: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const title = args.search;

    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new ConvexError("Unauthorize");
      }

      if (args.favorite) {
        const favoriteBoards = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_org", (query) =>
            query.eq("userId", userIdentity.subject).eq("orgId", args.orgId)
          )
          .order("desc")
          .collect();

        const boardIds = favoriteBoards.map((item) => item.boardId);

        const boards = await getAllOrThrow(ctx.db, boardIds);

        const adjustedBoards = title
          ? boards.filter((item) =>
              item.title.toLowerCase().includes(title.toLowerCase())
            )
          : boards;

        return adjustedBoards.map((item) => ({
          ...item,
          isFavorite: true,
        }));
      }

      let boards = [];

      if (title) {
        boards = await ctx.db
          .query("boards")
          .withSearchIndex("search_title", (query) =>
            query.search("title", title).eq("orgId", args.orgId)
          )
          .collect();
      } else {
        boards = await ctx.db
          .query("boards")
          .withIndex("by_org", (query) => query.eq("orgId", args.orgId))
          .order("desc")
          .collect();
      }

      const boardsWithFavoriteRelation = boards.map((item) => {
        return ctx.db
          .query("userFavorites")
          .withIndex("by_user_board", (q) =>
            q.eq("userId", userIdentity.subject).eq("boardId", item._id)
          )
          .unique()
          .then((favorite) => ({
            ...item,
            isFavorite: !!favorite,
          }));
      });

      const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);

      return boardsWithFavoriteBoolean;
    } catch (error) {
      throw new ConvexError("Oops! Something went wrong!");
    }
  },
});
