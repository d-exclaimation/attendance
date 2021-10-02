//
//  Toast.ts
//  web
//
//  Created by d-exclaimation on 16:50.
//

export type Toast = {
  title: string;
  description: string;
  status: "success" | "failure" | "warning" | "info";
};
