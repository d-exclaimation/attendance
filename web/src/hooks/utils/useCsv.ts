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
    const header = 'No,Name,Masuk,Keluar,"Jam kerja"';
    const content = records.map(
      ({ name, entryAt, leaveAt, workHours }, index) => {
        const [no, entryDateTime, leaveDateTime] = [
          index + 1,
          entryAt.toLocaleString("id-ID"),
          leaveAt?.toLocaleString("id-ID") ?? "-",
        ];
        return `${no},${name},"${entryDateTime}","${leaveDateTime}","${workHours}"`;
      }
    );
    const result = [header, ...content].join("\n");
    return encodeURI(CSV_TEMPLATE + result);
  }, [records]);
}
