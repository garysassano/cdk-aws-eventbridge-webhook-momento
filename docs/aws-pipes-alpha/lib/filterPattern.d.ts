import { IFilterPattern } from './filter';
/**
 * Generate a filter pattern from an input.
 */
export declare class FilterPattern {
    /**
     * Generates a filter pattern from a JSON object.
     */
    static fromObject(patternObject: Record<string, any>): IFilterPattern;
}
