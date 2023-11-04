import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
 
const es = initEdgeStore.create();
 

const edgeStoreRouter = es.router({
  publicImages: es.imageBucket()
  
  .beforeUpload(({ ctx, input, fileInfo }) => {
    return true; // allow upload
  })

  .beforeDelete(({ ctx, fileInfo }) => {
    return true; // allow delete
  }),

});
 
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
 
export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;