import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";




export const allPosts = query({
   args: { paginationOpts: paginationOptsValidator},
    handler: async (ctx,args) => {

      const documents = await ctx.db.query("documents").order("asc").paginate(args.paginationOpts);

      return documents
    },
  });


  export const deleteById = mutation({
    args: { documentId: v.id("documents")},
    handler: async (ctx,args) => {
   
      return await ctx.db.delete(args.documentId);
    },
  });

  export const updateLikes= mutation({
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



  export const updateFollower= mutation({
    args: { 
      id: v.id("documents"),
      followerArray: v.array(v.string())
    },
    handler: async (ctx, args) => {
      const { id } = args;   
 
     const document =  await ctx.db.patch(id, { follower:  args.followerArray });

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
  

    export const createLike = mutation({
      args: { 
        documentId: v.id("documents")
      },
        handler: async (ctx,args) => {

          
        const identity =await ctx.auth.getUserIdentity()

        if(!identity)
        {
          return
        }
        const userId  = identity.subject

        console.log(userId)

          const oneLike = await ctx.db.insert("likes",{
            likerId:userId,
            documentId: args.documentId
          })
    
          return oneLike
        },
      });



      export const removeLike = mutation({
        args: { 
          likeId: v.id("likes")
        },
          handler: async (ctx,args) => {
  
            
          const identity =await ctx.auth.getUserIdentity()
  
          if(!identity)
          {
            return
          }
  
            const oneLike = await ctx.db.delete(args.likeId)
      
            return oneLike
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



  export const listBookmarkedImages = query({
    args: {},
    handler: async (ctx) => {


      const identity =await ctx.auth.getUserIdentity()
  
      if(!identity)
      {
        return
      }

      const userId = identity.subject

    

      const messages = await ctx.db.query("documents").order("asc").collect();
      const messagesWithLikes = await Promise.all(
        messages.map(async (document) => {
          
          const likes = await ctx.db
            .query("likes")
            .withIndex("by_likerId_documentId", (q) => 
            q
            .eq("likerId",userId)
            .eq("documentId", document._id
            ))
            
            .collect();
          return {
            ...document,
            likes
          };
        })
      );
      // Reverse the list so that it's in a chronological order.
      return messagesWithLikes.reverse().map((documents) => ({
        ...documents
      
      }));
    },
  });

  export const createPost = mutation({
    args: {    
        title: v.string(),   
        coverImage: v.string(),      
        width: v.number(),
        height: v.number(),
        likesId: v.array(v.string()),
        follower:  v.array(v.string())
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
        likesId: args.likesId,
        follower: args.follower 
       });
   

      return document;

    },

  });

  