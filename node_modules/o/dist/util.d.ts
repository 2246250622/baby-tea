/**
 * Parse the specified dot notation into an iterable string array.
 */
declare function fromDotNotation(path: string): string[];
/**
 * Build array of strings into dot notation path
 */
declare function toDotNotation(paths: string[]): string;
/**
 * Export dot notation functions under single export
 */
export declare const dotNotation: {
    from: typeof fromDotNotation;
    to: typeof toDotNotation;
};
/**
 * Check if all args specified are objects
 */
export declare function valid(...args: any[]): boolean;
export {};
