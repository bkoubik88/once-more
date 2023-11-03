import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    coverImage: v.string(),
    width: v.number(),
    height: v.number(),
  }).index("by_user", ["userId"]),

  imageSize: defineTable({
    width: v.number(),
    height: v.number(),
    documentId: v.id("documents"),
  }).index("by_documentId", ["documentId"]),

  likes: defineTable({
    liker: v.string(),
    documentId: v.id("documents"),
  }).index("by_documentId", ["documentId"])
});
