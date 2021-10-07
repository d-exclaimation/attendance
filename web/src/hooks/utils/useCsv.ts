//
//  useCsv.ts
//  web
//
//  Created by d-exclaimation on 21:47.
//

import { useMemo } from "react";

const CSV_TEMPLATE = "data:text/csv;charset=utf-8,";

type Record = {
  id: string;
  entryAt: Date;
  leaveAt: Date | undefined;
  name: string;
  workHours: string;
};

export function useCsv(records: Record[]) {
  return useMemo(() => {
    const header = "Name,Entry At,Leave At, Work Hour(s)";
    const content = records.map(({ name, entryAt, leaveAt, workHours }) => {
      const [entryDateTime, leaveDateTime] = [
        entryAt.toLocaleString(),
        leaveAt?.toLocaleString() ?? "-",
      ];
      return `${name},"${entryDateTime}","${leaveDateTime}",${workHours}`;
    });
    const result = [header, ...content].join("\n");
    return encodeURI(CSV_TEMPLATE + result);
  }, [records]);
}
