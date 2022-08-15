// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { prestationRouter } from "./controllers/prestation";
import { typeRouter } from "./controllers/type";
import { userRouter } from "./user";
import { applianceRouter } from "./controllers/appliance";
import { clientRouter } from "./controllers/client";
import { contactRouter } from "./controllers/contact";
import { povRouter } from "./controllers/pov";
import { suiviRouter } from "./controllers/suivi";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("prestation.", prestationRouter)
  .merge("type.", typeRouter)
  .merge("user.", userRouter)
  .merge('appliance.',applianceRouter)
  .merge('client.',clientRouter)
  .merge('contact.',contactRouter)
  .merge('pov.',povRouter)
  .merge('suivi.',suiviRouter)
  ;

// export type definition of API
export type AppRouter = typeof appRouter;
