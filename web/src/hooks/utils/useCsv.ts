//
//  useCsv.ts
//  web
//
//  Created by d-exclaimation on 21:47.
//

import { useMemo } from "react";

/** CSV URI Template */
const CSV_TEMPLATE = "data:text/csv;charset=utf-8,";

/** Record type */
type Record = {
  id: string;
  entryAt: Date;
  leaveAt: Date | undefined;
  name: string;
  workHours: string;
};

/**
 * React hook to efficiently compute CSV Links
 * @param records Records information.
 * @returns Memoized CSV Links
 */
export function useCsv(records: Record[]) {
  return useMemo(() => {
    const header = 'No,Name,Masuk,Keluar,"Jam kerja","Jam Kerja (Read-only)"';
    const content = records.map(
      ({ name, entryAt, leaveAt, workHours }, index) => {
        const [no, entryDateTime, leaveDateTime] = [
          index + 1,
          entryAt.toLocaleString("en-GB"),
          leaveAt?.toLocaleString("en-GB") ?? "-",
        ];
        return `${no},${name},"${entryDateTime}","${leaveDateTime}","${
          !!leaveAt ? diffHour(entryAt, leaveAt) : "24:00"
        }","${workHours}"`;
      }
    );
    const result = [header, ...content].join("\n");
    return encodeURI(CSV_TEMPLATE + result);
  }, [records]);
}

/** Convert the proper data difference into human readable */
const diffHour = (entryAt: Date, leaveAt: Date) => {
  const diff = Math.abs(entryAt.getTime() - leaveAt.getTime());
  const diffHour = diff / (1000 * 60 * 60);
  const diffMinutes = (diff / (1000 * 60)) % 60;
  return `${Math.floor(diffHour)}:${diffMinutes < 10 ? "0" : ""}${Math.floor(
    diffMinutes
  )}`;
};
