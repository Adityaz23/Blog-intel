import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new task with the given text
export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.id("_storage"),
  },
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
      imageStorageId: args.imageStorageId,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    // fetching the data for the posts
    const posts = await ctx.db.query("posts").order("desc").collect();
    return await Promise.all(
      posts.map(async (posts) => {
        const resolvedImageUrl =
          posts.imageStorageId !== undefined
            ? await ctx.storage.getUrl(posts.imageStorageId)
            : null;
            return {...posts,imageUrl:resolvedImageUrl}
      }),
    );
  },
});

export const generateImageUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenitcated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});
