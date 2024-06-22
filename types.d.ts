/** index.d.ts */

/**
 * @param {string} string
 * @returns {Array}
 */
export function extractJsonFromString(string: string, parser?: typeof evalParser): any[];
/**
 * @param {string} json
 * @returns
 */
export function evalParser(json: string): any;
/**
 * @param {string} json
 * @returns
 */
export function jsonParser(json: string): any;
