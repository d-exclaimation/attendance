//
//  client.ts
//  web
//
//  Created by d-exclaimation on 11:02.
//

import { QueryClient } from "react-query";

/** React Query Client */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});
