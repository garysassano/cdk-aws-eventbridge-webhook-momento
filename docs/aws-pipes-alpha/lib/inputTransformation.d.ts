import { IPipe } from './pipe';
/**
 * The inputTemplate that is used to transform the input event payload with unquoted variables
 */
export interface InputTransformationConfig {
    /**
     * The inputTemplate that is used to transform the input event payload
     */
    readonly inputTemplate: string;
}
/**
 * Transform or replace the input event payload
 */
export interface IInputTransformation {
    /**
     * Bind the input transformation to the pipe and returns the inputTemplate string.
     */
    bind(pipe: IPipe): InputTransformationConfig;
}
/**
 * Transform or replace the input event payload
 */
export declare class InputTransformation implements IInputTransformation {
    /**
     * Creates an InputTransformation from a string.
     */
    static fromText(inputTemplate: string): InputTransformation;
    /**
     * Creates an InputTransformation from a jsonPath expression of the input event.
     */
    static fromEventPath(jsonPathExpression: string): InputTransformation;
    /**
     * Creates an InputTransformation from a pipe variable.
     */
    static fromObject(inputTemplate: Record<string, any>): InputTransformation;
    private type;
    /**
     * The inputTemplate that is used to transform the input event payload
     */
    private inputTemplate;
    private constructor();
    bind(pipe: IPipe): InputTransformationConfig;
    private unquoteDynamicInputs;
}
