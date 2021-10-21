//
//  RecordTable.tsx
//  web
//
//  Created by d-exclaimation on 15:22.
//

import React from "react";
import { useCsv } from "../../hooks/utils/useCsv";
import { ReactComponent as DownloadIcon } from "./download.svg";

type Props = {
  rows: RecordRow[];
};

type RecordRow = {
  id: string;
  name: string;
  entryAt: Date;
  leaveAt: Date | undefined;
  workHours: string;
};

const RecordTable: React.FC<Props> = ({ rows }) => {
  const csvLink = useCsv(rows);
  return (
    <div className="flex flex-col w-full my-2">
      <div className="flex justify-end my-2">
        <a
          download="record.csv"
          className="flex flex-row px-6 py-2 text-left text-xs font-medium rounded-md hover:bg-indigo-50 hover:bg-opacity-80 text-indigo-600 uppercase"
          href={csvLink}
        >
          <DownloadIcon />
          csv
        </a>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Entry At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Leave At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Work hour(s)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map(({ leaveAt, id, name, entryAt, workHours }) => {
                  const seed = sanitised(name);
                  const isAtWork = !leaveAt;
                  return (
                    <tr key={id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entryAt.toLocaleString()}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {leaveAt?.toLocaleString() ?? "-"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            isAtWork ? "bg-green-100" : "bg-indigo-100"
                          } ${isAtWork ? "text-green-800" : "text-indigo-800"}`}
                        >
                          {isAtWork ? "At work" : "Out of work"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{workHours}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function sanitised(name: string): string {
  return encodeURIComponent(name);
}

export default RecordTable;
