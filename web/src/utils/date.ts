//
//  date.ts
//  web
//
//  Created by d-exclaimation on 20:47.
//

const MONTHS = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

export const monthName = (offset: number = 0) => {
  const now = new Date();
  now.setMonth(now.getMonth() - offset);
  return MONTHS[now.getMonth()] ?? "unanmed";
};
