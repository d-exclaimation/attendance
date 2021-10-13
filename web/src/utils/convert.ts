//
//  convert.ts
//  web
//
//  Created by d-exclaimation on 16:12.
//

import { AdminPanelQuery } from "../graphql/api";

/**
 * Flatten nested GraphQL results
 *
 * ---
 * ```graphql
 * fragment {
 *  id
 *  entryAt
 *  leaveAt
 *  user {
 *    id
 *    name
 *  }
 *  workHours
 * }
 *
 * fragment {
 *   id
 *   entryAt
 *   leaveAt
 *   name
 *   workHours
 * }
 * ```
 *
 * @param param0 Record graphql query result
 * @returns A flatten result of the graphql query
 */
export const convertPanel = ({
  id,
  entryAt,
  leaveAt,
  user: { name },
  workHours,
}: AdminPanelQuery["recorded"][0]) => ({
  id,
  entryAt: new Date(entryAt),
  leaveAt: leaveAt ? new Date(leaveAt) : undefined,
  name,
  workHours,
});

/**
 * `parseInt` with no `NaN`
 * @param str String to be parsed
 * @param defaultValue Default value to be converted into
 * @returns
 */
export const fallbackParseInt = (defaultValue: number) => (str: string) => {
  const res = parseInt(str);
  return isNaN(res) ? defaultValue : res;
};
