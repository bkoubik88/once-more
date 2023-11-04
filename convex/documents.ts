import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";


interface DOCTYPE {
   _creationTime: number,
      _id: Id<"documents">,
      coverImage: string,
      height: number,
      title: string,
      userId: string,
      width: number
}


export const allPosts = query({
  args: { paginationOpts: paginationOptsValidator},
    handler: async (ctx,args) => {

      const documents = await ctx.db.query("documents").withIndex("by_user"
      ).order("asc").paginate(args.paginationOpts);


      return documents
    },
  });

  export const updateDocument= mutation({
    args: { 
      id: v.id("documents"),
      likesArray: v.array(v.string())
    },
    handler: async (ctx, args) => {
      const { id } = args;   
 
     const document =  await ctx.db.patch(id, { likesId:  args.likesArray });

     return document
     
    },
  });



  export const like = mutation({
    args: { 
      likerId: v.string(),
      documentId: v.id("documents")
    },
      handler: async (ctx,args) => {
        
        const document = await ctx.db.insert("likes",{
          likerId:args.likerId,
          documentId:args.documentId
        })
  
        return document
      },
    });
  


  export const getSingleImage = query({
    args: { documentId: v.id("documents")},
      handler: async (ctx,args) => {
        const document = await ctx.db.query("imageSize").withIndex("by_documentId",(q)=>q.eq("documentId",args.documentId)).collect()
  
        return document
      },
    });
  


  export const insertImageSize = mutation({
    args:{
      width: v.number(),
      height: v.number(),
      documentId: v.id("documents"),
    },handler: async (ctx, args) => {

      const document = await ctx.db.insert("imageSize", { 
         width: args.width,
         height:args.height,
         documentId: args.documentId
      });
    
 
       return document;
 
     },
  })

  export const createPost = mutation({
    args: {    
        title: v.string(),   
        coverImage: v.string(),      
        width: v.number(),
        height: v.number(),
        likesId: v.array(v.string())
     },
    handler: async (ctx, args) => {

     const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
          throw new Error("Not authenticated");
        }
    
     const userId = identity.subject;

     const document = await ctx.db.insert("documents", { 
        title: args.title,        
        userId,
        coverImage:args.coverImage,
        width:args.width,
        height:args.height,
        likesId: args.likesId 
       });
   

      return document;

    },

  });

  