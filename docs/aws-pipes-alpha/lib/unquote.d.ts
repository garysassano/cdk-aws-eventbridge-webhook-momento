/**
 * Removes the quotes from PipeVariables and EventPathExpressions
 * @param stringWithQuotes a string that eventually contains pipe variable or event path expression values with quotes
 * @returns a string were pipe variables and event path expressions don't have quotes
 */
export declare const unquote: (stringWithQuotes: string) => string;
