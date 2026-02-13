import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        // this is the field for the blog post article ->
        title: v.string(),
        body: v.string(),
        authorId: v.string()
    })
})