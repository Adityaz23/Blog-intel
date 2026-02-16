import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        // this is the field for the blog post article ->
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
        // Now, here we will add the image storage id :-
        imageStorageId: v.optional(v.id("_storage"))
    }),
    // This table is for the user to comment on the blog :-
    comments: defineTable({
        postId: v.id("posts"),
        authorId: v.string(),
        authorName: v.string(),
        body: v.string()
    })
})
