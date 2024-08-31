import { IResolvable, IResolveContext } from 'aws-cdk-lib';
/** Reserved pipe variables
* @see https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-input-transformation.html#input-transform-reserved
*/
export declare enum PipeVariable {
    /**
     * The Amazon Resource Name (ARN) of the pipe.
     */
    ARN = "<aws.pipes.pipe-arn>",
    /**
     * The name of the pipe.
     */
    NAME = "<aws.pipes.pipe-name>",
    /**
     * The ARN of the event source of the pipe.
     */
    SOURCE_ARN = "<aws.pipes.source-arn>",
    /**
     * The ARN of the enrichment of the pipe.
     */
    ENRICHMENT_ARN = "<aws.pipes.enrichment-arn>",
    /**
     * The ARN of the target of the pipe.
     */
    TARGET_ARN = "<aws.pipes.target-arn>",
    /**
     * The time at which the event was received by the input transformer. This is an ISO 8601 timestamp. This time is different for the enrichment input transformer and the target input transformer, depending on when the enrichment completed processing the event.
     */
    EVENT_INGESTION_TIME = "<aws.pipes.event.ingestion-time>",
    /**
     * The event as received by the input transformer.
     */
    EVENT = "<aws.pipes.event>",
    /**
     * The same as aws.pipes.event, but the variable only has a value if the original payload, either from the source or returned by the enrichment, is JSON. If the pipe has an encoded field, such as the Amazon SQS body field or the Kinesis data, those fields are decoded and turned into valid JSON. Because it isn't escaped, the variable can only be used as a value for a JSON field. For more information, see Implicit body data parsing.
     */
    EVENT_JSON = "<aws.pipes.event.json>"
}
/**
 * Dynamic variables that can be used in the input transformation.
 */
export declare class DynamicInput implements IResolvable {
    private value;
    /**
     * Value from the event payload at jsonPath.
     */
    static fromEventPath(path: string): DynamicInput;
    /**
     * The Amazon Resource Name (ARN) of the pipe.
     */
    static get pipeArn(): DynamicInput;
    /**
     * The name of the pipe.
     */
    static get pipeName(): DynamicInput;
    /**
     * The ARN of the event source of the pipe.
     */
    static get sourceArn(): DynamicInput;
    /**
     * The ARN of the enrichment of the pipe.
     */
    static get enrichmentArn(): DynamicInput;
    /**
     * The ARN of the target of the pipe.
     */
    static get targetArn(): DynamicInput;
    /**
     * The time at which the event was received by the input transformer. This is an ISO 8601 timestamp. This time is different for the enrichment input transformer and the target input transformer, depending on when the enrichment completed processing the event.
     */
    static get eventIngestionTime(): DynamicInput;
    /**
     * The event as received by the input transformer.
     */
    static get event(): DynamicInput;
    /**
     * The same as aws.pipes.event, but the variable only has a value if the original payload, either from the source or returned by the enrichment, is JSON. If the pipe has an encoded field, such as the Amazon SQS body field or the Kinesis data, those fields are decoded and turned into valid JSON. Because it isn't escaped, the variable can only be used as a value for a JSON field. For more information, see Implicit body data parsing.
     */
    static get eventJson(): DynamicInput;
    /**
     * Value from one of the provided Pipe variables.
    */
    private static fromPipeVariable;
    /**
     * Human readable display hint about the event pattern
     */
    readonly displayHint: string;
    readonly creationStack: string[];
    private constructor();
    resolve(_context: IResolveContext): any;
    /**
     * Return a string representation of a dynamic input.
     */
    toString(): string;
    /**
     * Return a JSON representation of a dynamic input.
     */
    toJSON(): string;
}
