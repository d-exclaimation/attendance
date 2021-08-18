//
//  loader.ts
//  server
//
//  Created by d-exclaimation on 11:25.
//

import { Attendance, PrismaClient, User } from "@prisma/client";
import DataLoader from "dataloader";

type PrismaLoader<K, V> = (prisma: PrismaClient) => DataLoader<K, V>;

export const userLoader: PrismaLoader<string, User> = (prisma) =>
  new DataLoader(async (indices) => {
    const res = await prisma.user.findMany({
      where: {
        id: {
          in: indices.map((x) => x),
        },
      },
    });

    const map = new Map<string, User>(
      res.map((u) => [u.id, u] as [string, User])
    );

    return indices.map((i) => map.get(i)!);
  });

export const attendanceLoader: PrismaLoader<string, Attendance[]> = (prisma) =>
  new DataLoader(async (indices) => {
    const res = await prisma.attendance.findMany({
      where: {
        userId: {
          in: indices.map((x) => x),
        },
      },
    });
    const map = new Map<string, Attendance[]>();

    res.forEach((x) => {
      const prev = map.get(x.userId) ?? [];
      map.set(x.userId, [...prev, x]);
    });

    return indices.map((i) => map.get(i) ?? []);
  });
