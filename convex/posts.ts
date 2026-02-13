import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new task with the given text
export const createPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    // creating the authentication route :-
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not Authenticated!");
    }
    const blogArticle = await ctx.db.insert("posts", {
      authorId: user._id,
      title: args.title,
      body: args.body,
    });
    return blogArticle;
  },
});
