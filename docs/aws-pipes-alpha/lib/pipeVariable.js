"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicInput = exports.PipeVariable = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
/** Reserved pipe variables
* @see https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-input-transformation.html#input-transform-reserved
*/
var PipeVariable;
(function (PipeVariable) {
    /**
     * The Amazon Resource Name (ARN) of the pipe.
     */
    PipeVariable["ARN"] = "<aws.pipes.pipe-arn>";
    /**
     * The name of the pipe.
     */
    PipeVariable["NAME"] = "<aws.pipes.pipe-name>";
    /**
     * The ARN of the event source of the pipe.
     */
    PipeVariable["SOURCE_ARN"] = "<aws.pipes.source-arn>";
    /**
     * The ARN of the enrichment of the pipe.
     */
    PipeVariable["ENRICHMENT_ARN"] = "<aws.pipes.enrichment-arn>";
    /**
     * The ARN of the target of the pipe.
     */
    PipeVariable["TARGET_ARN"] = "<aws.pipes.target-arn>";
    /**
     * The time at which the event was received by the input transformer. This is an ISO 8601 timestamp. This time is different for the enrichment input transformer and the target input transformer, depending on when the enrichment completed processing the event.
     */
    PipeVariable["EVENT_INGESTION_TIME"] = "<aws.pipes.event.ingestion-time>";
    /**
     * The event as received by the input transformer.
     */
    PipeVariable["EVENT"] = "<aws.pipes.event>";
    /**
     * The same as aws.pipes.event, but the variable only has a value if the original payload, either from the source or returned by the enrichment, is JSON. If the pipe has an encoded field, such as the Amazon SQS body field or the Kinesis data, those fields are decoded and turned into valid JSON. Because it isn't escaped, the variable can only be used as a value for a JSON field. For more information, see Implicit body data parsing.
     */
    PipeVariable["EVENT_JSON"] = "<aws.pipes.event.json>";
})(PipeVariable || (exports.PipeVariable = PipeVariable = {}));
/**
 * Dynamic variables that can be used in the input transformation.
 */
class DynamicInput {
    /**
     * Value from the event payload at jsonPath.
     */
    static fromEventPath(path) {
        if (!path.startsWith('$.')) {
            throw new Error('jsonPathExpression start with "$."');
        }
        return new DynamicInput(`<${path}>`);
    }
    /**
     * The Amazon Resource Name (ARN) of the pipe.
     */
    static get pipeArn() {
        return this.fromPipeVariable(PipeVariable.ARN);
    }
    /**
     * The name of the pipe.
     */
    static get pipeName() {
        return this.fromPipeVariable(PipeVariable.NAME);
    }
    /**
     * The ARN of the event source of the pipe.
     */
    static get sourceArn() {
        return this.fromPipeVariable(PipeVariable.SOURCE_ARN);
    }
    /**
     * The ARN of the enrichment of the pipe.
     */
    static get enrichmentArn() {
        return this.fromPipeVariable(PipeVariable.ENRICHMENT_ARN);
    }
    /**
     * The ARN of the target of the pipe.
     */
    static get targetArn() {
        return this.fromPipeVariable(PipeVariable.TARGET_ARN);
    }
    /**
     * The time at which the event was received by the input transformer. This is an ISO 8601 timestamp. This time is different for the enrichment input transformer and the target input transformer, depending on when the enrichment completed processing the event.
     */
    static get eventIngestionTime() {
        return this.fromPipeVariable(PipeVariable.EVENT_INGESTION_TIME);
    }
    /**
     * The event as received by the input transformer.
     */
    static get event() {
        return this.fromPipeVariable(PipeVariable.EVENT);
    }
    /**
     * The same as aws.pipes.event, but the variable only has a value if the original payload, either from the source or returned by the enrichment, is JSON. If the pipe has an encoded field, such as the Amazon SQS body field or the Kinesis data, those fields are decoded and turned into valid JSON. Because it isn't escaped, the variable can only be used as a value for a JSON field. For more information, see Implicit body data parsing.
     */
    static get eventJson() {
        return this.fromPipeVariable(PipeVariable.EVENT_JSON);
    }
    /**
     * Value from one of the provided Pipe variables.
    */
    static fromPipeVariable(variable) {
        return new DynamicInput(variable);
    }
    constructor(value) {
        this.value = value;
        this.displayHint = value.toString();
        this.creationStack = (0, aws_cdk_lib_1.captureStackTrace)();
        this.value = value;
    }
    resolve(_context) {
        return this.value;
    }
    /**
     * Return a string representation of a dynamic input.
     */
    toString() {
        return this.value.toString();
    }
    /**
     * Return a JSON representation of a dynamic input.
     */
    toJSON() {
        return this.value.toString();
    }
}
exports.DynamicInput = DynamicInput;
_a = JSII_RTTI_SYMBOL_1;
DynamicInput[_a] = { fqn: "@aws-cdk/aws-pipes-alpha.DynamicInput", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZVZhcmlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlwZVZhcmlhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkNBQThFO0FBRTlFOztFQUVFO0FBQ0YsSUFBWSxZQWtDWDtBQWxDRCxXQUFZLFlBQVk7SUFDdEI7O09BRUc7SUFDSCw0Q0FBNEIsQ0FBQTtJQUM1Qjs7T0FFRztJQUNILDhDQUE4QixDQUFBO0lBQzlCOztPQUVHO0lBQ0gscURBQXFDLENBQUE7SUFDckM7O09BRUc7SUFDSCw2REFBNkMsQ0FBQTtJQUM3Qzs7T0FFRztJQUNILHFEQUFxQyxDQUFBO0lBQ3JDOztPQUVHO0lBQ0gseUVBQXlELENBQUE7SUFDekQ7O09BRUc7SUFDSCwyQ0FBMkIsQ0FBQTtJQUMzQjs7T0FFRztJQUNILHFEQUFxQyxDQUFBO0FBRXZDLENBQUMsRUFsQ1csWUFBWSw0QkFBWixZQUFZLFFBa0N2QjtBQUVEOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBQ3ZCOztPQUVHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFZO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztLQUN0QztJQUVEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLE9BQU87UUFDdkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hEO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakQ7SUFFRDs7T0FFRztJQUNJLE1BQU0sS0FBSyxTQUFTO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2RDtJQUVEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLGFBQWE7UUFDN0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzNEO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssU0FBUztRQUN6QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdkQ7SUFFRDs7T0FFRztJQUNJLE1BQU0sS0FBSyxrQkFBa0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDakU7SUFFRDs7T0FFRztJQUVJLE1BQU0sS0FBSyxLQUFLO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsRDtJQUVEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLFNBQVM7UUFDekIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQ7O01BRUU7SUFDTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBc0I7UUFDcEQsT0FBTyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNuQztJQVFELFlBQTRCLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBQSwrQkFBaUIsR0FBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxDQUFDLFFBQXlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjtJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5QjtJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7QUF2R0gsb0NBd0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVJlc29sdmFibGUsIElSZXNvbHZlQ29udGV4dCwgY2FwdHVyZVN0YWNrVHJhY2UgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5cbi8qKiBSZXNlcnZlZCBwaXBlIHZhcmlhYmxlc1xuKiBAc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9ldmVudGJyaWRnZS9sYXRlc3QvdXNlcmd1aWRlL2ViLXBpcGVzLWlucHV0LXRyYW5zZm9ybWF0aW9uLmh0bWwjaW5wdXQtdHJhbnNmb3JtLXJlc2VydmVkXG4qL1xuZXhwb3J0IGVudW0gUGlwZVZhcmlhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSBBbWF6b24gUmVzb3VyY2UgTmFtZSAoQVJOKSBvZiB0aGUgcGlwZS5cbiAgICovXG4gIEFSTiA9ICc8YXdzLnBpcGVzLnBpcGUtYXJuPicsXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgcGlwZS5cbiAgICovXG4gIE5BTUUgPSAnPGF3cy5waXBlcy5waXBlLW5hbWU+JyxcbiAgLyoqXG4gICAqIFRoZSBBUk4gb2YgdGhlIGV2ZW50IHNvdXJjZSBvZiB0aGUgcGlwZS5cbiAgICovXG4gIFNPVVJDRV9BUk4gPSAnPGF3cy5waXBlcy5zb3VyY2UtYXJuPicsXG4gIC8qKlxuICAgKiBUaGUgQVJOIG9mIHRoZSBlbnJpY2htZW50IG9mIHRoZSBwaXBlLlxuICAgKi9cbiAgRU5SSUNITUVOVF9BUk4gPSAnPGF3cy5waXBlcy5lbnJpY2htZW50LWFybj4nLFxuICAvKipcbiAgICogVGhlIEFSTiBvZiB0aGUgdGFyZ2V0IG9mIHRoZSBwaXBlLlxuICAgKi9cbiAgVEFSR0VUX0FSTiA9ICc8YXdzLnBpcGVzLnRhcmdldC1hcm4+JyxcbiAgLyoqXG4gICAqIFRoZSB0aW1lIGF0IHdoaWNoIHRoZSBldmVudCB3YXMgcmVjZWl2ZWQgYnkgdGhlIGlucHV0IHRyYW5zZm9ybWVyLiBUaGlzIGlzIGFuIElTTyA4NjAxIHRpbWVzdGFtcC4gVGhpcyB0aW1lIGlzIGRpZmZlcmVudCBmb3IgdGhlIGVucmljaG1lbnQgaW5wdXQgdHJhbnNmb3JtZXIgYW5kIHRoZSB0YXJnZXQgaW5wdXQgdHJhbnNmb3JtZXIsIGRlcGVuZGluZyBvbiB3aGVuIHRoZSBlbnJpY2htZW50IGNvbXBsZXRlZCBwcm9jZXNzaW5nIHRoZSBldmVudC5cbiAgICovXG4gIEVWRU5UX0lOR0VTVElPTl9USU1FID0gJzxhd3MucGlwZXMuZXZlbnQuaW5nZXN0aW9uLXRpbWU+JyxcbiAgLyoqXG4gICAqIFRoZSBldmVudCBhcyByZWNlaXZlZCBieSB0aGUgaW5wdXQgdHJhbnNmb3JtZXIuXG4gICAqL1xuICBFVkVOVCA9ICc8YXdzLnBpcGVzLmV2ZW50PicsXG4gIC8qKlxuICAgKiBUaGUgc2FtZSBhcyBhd3MucGlwZXMuZXZlbnQsIGJ1dCB0aGUgdmFyaWFibGUgb25seSBoYXMgYSB2YWx1ZSBpZiB0aGUgb3JpZ2luYWwgcGF5bG9hZCwgZWl0aGVyIGZyb20gdGhlIHNvdXJjZSBvciByZXR1cm5lZCBieSB0aGUgZW5yaWNobWVudCwgaXMgSlNPTi4gSWYgdGhlIHBpcGUgaGFzIGFuIGVuY29kZWQgZmllbGQsIHN1Y2ggYXMgdGhlIEFtYXpvbiBTUVMgYm9keSBmaWVsZCBvciB0aGUgS2luZXNpcyBkYXRhLCB0aG9zZSBmaWVsZHMgYXJlIGRlY29kZWQgYW5kIHR1cm5lZCBpbnRvIHZhbGlkIEpTT04uIEJlY2F1c2UgaXQgaXNuJ3QgZXNjYXBlZCwgdGhlIHZhcmlhYmxlIGNhbiBvbmx5IGJlIHVzZWQgYXMgYSB2YWx1ZSBmb3IgYSBKU09OIGZpZWxkLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIEltcGxpY2l0IGJvZHkgZGF0YSBwYXJzaW5nLlxuICAgKi9cbiAgRVZFTlRfSlNPTiA9ICc8YXdzLnBpcGVzLmV2ZW50Lmpzb24+JyxcblxufVxuXG4vKipcbiAqIER5bmFtaWMgdmFyaWFibGVzIHRoYXQgY2FuIGJlIHVzZWQgaW4gdGhlIGlucHV0IHRyYW5zZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0lucHV0IGltcGxlbWVudHMgSVJlc29sdmFibGUge1xuICAvKipcbiAgICogVmFsdWUgZnJvbSB0aGUgZXZlbnQgcGF5bG9hZCBhdCBqc29uUGF0aC5cbiAgICovXG4gIHN0YXRpYyBmcm9tRXZlbnRQYXRoKHBhdGg6IHN0cmluZyk6IER5bmFtaWNJbnB1dCB7XG4gICAgaWYgKCFwYXRoLnN0YXJ0c1dpdGgoJyQuJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignanNvblBhdGhFeHByZXNzaW9uIHN0YXJ0IHdpdGggXCIkLlwiJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRHluYW1pY0lucHV0KGA8JHtwYXRofT5gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgQW1hem9uIFJlc291cmNlIE5hbWUgKEFSTikgb2YgdGhlIHBpcGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCBwaXBlQXJuICgpOiBEeW5hbWljSW5wdXQge1xuICAgIHJldHVybiB0aGlzLmZyb21QaXBlVmFyaWFibGUoUGlwZVZhcmlhYmxlLkFSTik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHBpcGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCBwaXBlTmFtZSAoKTogRHluYW1pY0lucHV0IHtcbiAgICByZXR1cm4gdGhpcy5mcm9tUGlwZVZhcmlhYmxlKFBpcGVWYXJpYWJsZS5OQU1FKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgQVJOIG9mIHRoZSBldmVudCBzb3VyY2Ugb2YgdGhlIHBpcGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCBzb3VyY2VBcm4gKCk6IER5bmFtaWNJbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbVBpcGVWYXJpYWJsZShQaXBlVmFyaWFibGUuU09VUkNFX0FSTik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIEFSTiBvZiB0aGUgZW5yaWNobWVudCBvZiB0aGUgcGlwZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGVucmljaG1lbnRBcm4gKCk6IER5bmFtaWNJbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbVBpcGVWYXJpYWJsZShQaXBlVmFyaWFibGUuRU5SSUNITUVOVF9BUk4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBBUk4gb2YgdGhlIHRhcmdldCBvZiB0aGUgcGlwZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IHRhcmdldEFybiAoKTogRHluYW1pY0lucHV0IHtcbiAgICByZXR1cm4gdGhpcy5mcm9tUGlwZVZhcmlhYmxlKFBpcGVWYXJpYWJsZS5UQVJHRVRfQVJOKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSBhdCB3aGljaCB0aGUgZXZlbnQgd2FzIHJlY2VpdmVkIGJ5IHRoZSBpbnB1dCB0cmFuc2Zvcm1lci4gVGhpcyBpcyBhbiBJU08gODYwMSB0aW1lc3RhbXAuIFRoaXMgdGltZSBpcyBkaWZmZXJlbnQgZm9yIHRoZSBlbnJpY2htZW50IGlucHV0IHRyYW5zZm9ybWVyIGFuZCB0aGUgdGFyZ2V0IGlucHV0IHRyYW5zZm9ybWVyLCBkZXBlbmRpbmcgb24gd2hlbiB0aGUgZW5yaWNobWVudCBjb21wbGV0ZWQgcHJvY2Vzc2luZyB0aGUgZXZlbnQuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCBldmVudEluZ2VzdGlvblRpbWUgKCk6IER5bmFtaWNJbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbVBpcGVWYXJpYWJsZShQaXBlVmFyaWFibGUuRVZFTlRfSU5HRVNUSU9OX1RJTUUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBldmVudCBhcyByZWNlaXZlZCBieSB0aGUgaW5wdXQgdHJhbnNmb3JtZXIuXG4gICAqL1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGV2ZW50ICgpOiBEeW5hbWljSW5wdXQge1xuICAgIHJldHVybiB0aGlzLmZyb21QaXBlVmFyaWFibGUoUGlwZVZhcmlhYmxlLkVWRU5UKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2FtZSBhcyBhd3MucGlwZXMuZXZlbnQsIGJ1dCB0aGUgdmFyaWFibGUgb25seSBoYXMgYSB2YWx1ZSBpZiB0aGUgb3JpZ2luYWwgcGF5bG9hZCwgZWl0aGVyIGZyb20gdGhlIHNvdXJjZSBvciByZXR1cm5lZCBieSB0aGUgZW5yaWNobWVudCwgaXMgSlNPTi4gSWYgdGhlIHBpcGUgaGFzIGFuIGVuY29kZWQgZmllbGQsIHN1Y2ggYXMgdGhlIEFtYXpvbiBTUVMgYm9keSBmaWVsZCBvciB0aGUgS2luZXNpcyBkYXRhLCB0aG9zZSBmaWVsZHMgYXJlIGRlY29kZWQgYW5kIHR1cm5lZCBpbnRvIHZhbGlkIEpTT04uIEJlY2F1c2UgaXQgaXNuJ3QgZXNjYXBlZCwgdGhlIHZhcmlhYmxlIGNhbiBvbmx5IGJlIHVzZWQgYXMgYSB2YWx1ZSBmb3IgYSBKU09OIGZpZWxkLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIEltcGxpY2l0IGJvZHkgZGF0YSBwYXJzaW5nLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXQgZXZlbnRKc29uICgpOiBEeW5hbWljSW5wdXQge1xuICAgIHJldHVybiB0aGlzLmZyb21QaXBlVmFyaWFibGUoUGlwZVZhcmlhYmxlLkVWRU5UX0pTT04pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbHVlIGZyb20gb25lIG9mIHRoZSBwcm92aWRlZCBQaXBlIHZhcmlhYmxlcy5cbiAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgZnJvbVBpcGVWYXJpYWJsZSh2YXJpYWJsZTogUGlwZVZhcmlhYmxlKTogRHluYW1pY0lucHV0IHtcbiAgICByZXR1cm4gbmV3IER5bmFtaWNJbnB1dCh2YXJpYWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogSHVtYW4gcmVhZGFibGUgZGlzcGxheSBoaW50IGFib3V0IHRoZSBldmVudCBwYXR0ZXJuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZGlzcGxheUhpbnQ6IHN0cmluZztcbiAgcHVibGljIHJlYWRvbmx5IGNyZWF0aW9uU3RhY2s6IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IocHJpdmF0ZSB2YWx1ZSA6c3RyaW5nKSB7XG4gICAgdGhpcy5kaXNwbGF5SGludCA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5jcmVhdGlvblN0YWNrID0gY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZXNvbHZlKF9jb250ZXh0OiBJUmVzb2x2ZUNvbnRleHQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIGR5bmFtaWMgaW5wdXQuXG4gICAqL1xuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIGR5bmFtaWMgaW5wdXQuXG4gICAqL1xuICB0b0pTT04oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZygpO1xuICB9XG59XG4iXX0=