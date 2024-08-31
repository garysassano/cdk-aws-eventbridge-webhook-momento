"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsTarget = void 0;
const jsiiDeprecationWarnings = require("../.warnings.jsii.js");
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
/**
 * A EventBridge Pipes target that sends messages to an SQS queue.
 */
class SqsTarget {
    constructor(queue, parameters) {
        try {
            jsiiDeprecationWarnings._aws_cdk_aws_pipes_targets_alpha_SqsTargetParameters(parameters);
        }
        catch (error) {
            if (process.env.JSII_DEBUG !== "1" && error.name === "DeprecationError") {
                Error.captureStackTrace(error, SqsTarget);
            }
            throw error;
        }
        this.queue = queue;
        this.targetArn = queue.queueArn;
        this.queueParameters = parameters;
    }
    grantPush(grantee) {
        this.queue.grantSendMessages(grantee);
    }
    bind(pipe) {
        if (!this.queueParameters) {
            return {
                targetParameters: {},
            };
        }
        return {
            targetParameters: {
                inputTemplate: this.queueParameters.inputTransformation?.bind(pipe).inputTemplate,
                sqsQueueParameters: this.queueParameters,
            },
        };
    }
}
exports.SqsTarget = SqsTarget;
_a = JSII_RTTI_SYMBOL_1;
SqsTarget[_a] = { fqn: "@aws-cdk/aws-pipes-targets-alpha.SqsTarget", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3FzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQW1DQTs7R0FFRztBQUNILE1BQWEsU0FBUztJQUlwQixZQUFZLEtBQWEsRUFBRSxVQUFnQzs7Ozs7OytDQUpoRCxTQUFTOzs7O1FBS2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztLQUNuQztJQUNELFNBQVMsQ0FBQyxPQUFjO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkM7SUFDRCxJQUFJLENBQUMsSUFBVztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDMUIsT0FBTztnQkFDTCxnQkFBZ0IsRUFBRSxFQUFFO2FBQ3JCLENBQUM7UUFDSixDQUFDO1FBRUQsT0FBTztZQUNMLGdCQUFnQixFQUFFO2dCQUNoQixhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYTtnQkFDakYsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGVBQWU7YUFDekM7U0FDRixDQUFDO0tBQ0g7O0FBekJILDhCQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbnB1dFRyYW5zZm9ybWF0aW9uLCBJUGlwZSwgSVRhcmdldCwgVGFyZ2V0Q29uZmlnIH0gZnJvbSAnQGF3cy1jZGsvYXdzLXBpcGVzLWFscGhhJztcbmltcG9ydCB7IElSb2xlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgeyBJUXVldWUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcblxuLyoqXG4gKiBTUVMgdGFyZ2V0IHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3FzVGFyZ2V0UGFyYW1ldGVycyB7XG4gIC8qKlxuICAgKiBUaGUgaW5wdXQgdHJhbnNmb3JtYXRpb24gdG8gYXBwbHkgdG8gdGhlIG1lc3NhZ2UgYmVmb3JlIHNlbmRpbmcgaXQgdG8gdGhlIHRhcmdldC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQVdTQ2xvdWRGb3JtYXRpb24vbGF0ZXN0L1VzZXJHdWlkZS9hd3MtcHJvcGVydGllcy1waXBlcy1waXBlLXBpcGV0YXJnZXRwYXJhbWV0ZXJzLmh0bWwjY2ZuLXBpcGVzLXBpcGUtcGlwZXRhcmdldHBhcmFtZXRlcnMtaW5wdXR0ZW1wbGF0ZVxuICAgKiBAZGVmYXVsdCBub25lXG4gICAqL1xuICByZWFkb25seSBpbnB1dFRyYW5zZm9ybWF0aW9uPzogSUlucHV0VHJhbnNmb3JtYXRpb247XG5cbiAgLyoqXG4gICAqIFRoaXMgcGFyYW1ldGVyIGFwcGxpZXMgb25seSB0byBGSUZPIChmaXJzdC1pbi1maXJzdC1vdXQpIHF1ZXVlcy5cbiAgICpcbiAgICogVGhlIHRva2VuIHVzZWQgZm9yIGRlZHVwbGljYXRpb24gb2Ygc2VudCBtZXNzYWdlcy5cbiAgICpcbiAgICogQHNlZSBodHRwOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BV1NDbG91ZEZvcm1hdGlvbi9sYXRlc3QvVXNlckd1aWRlL2F3cy1wcm9wZXJ0aWVzLXBpcGVzLXBpcGUtcGlwZXRhcmdldHNxc3F1ZXVlcGFyYW1ldGVycy5odG1sI2Nmbi1waXBlcy1waXBlLXBpcGV0YXJnZXRzcXNxdWV1ZXBhcmFtZXRlcnMtbWVzc2FnZWRlZHVwbGljYXRpb25pZFxuICAgKiBAZGVmYXVsdCBub25lXG4gICAqL1xuICByZWFkb25seSBtZXNzYWdlRGVkdXBsaWNhdGlvbklkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgRklGTyBtZXNzYWdlIGdyb3VwIElEIHRvIHVzZSBhcyB0aGUgdGFyZ2V0LlxuICAgKlxuICAgKiBAc2VlIGh0dHA6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0Nsb3VkRm9ybWF0aW9uL2xhdGVzdC9Vc2VyR3VpZGUvYXdzLXByb3BlcnRpZXMtcGlwZXMtcGlwZS1waXBldGFyZ2V0c3FzcXVldWVwYXJhbWV0ZXJzLmh0bWwjY2ZuLXBpcGVzLXBpcGUtcGlwZXRhcmdldHNxc3F1ZXVlcGFyYW1ldGVycy1tZXNzYWdlZ3JvdXBpZFxuICAgKiBAZGVmYXVsdCBub25lXG4gICAqL1xuICByZWFkb25seSBtZXNzYWdlR3JvdXBJZD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIEV2ZW50QnJpZGdlIFBpcGVzIHRhcmdldCB0aGF0IHNlbmRzIG1lc3NhZ2VzIHRvIGFuIFNRUyBxdWV1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNxc1RhcmdldCBpbXBsZW1lbnRzIElUYXJnZXQge1xuICBwcml2YXRlIHF1ZXVlOiBJUXVldWU7XG4gIHByaXZhdGUgcXVldWVQYXJhbWV0ZXJzPzogU3FzVGFyZ2V0UGFyYW1ldGVycztcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldEFybjogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihxdWV1ZTogSVF1ZXVlLCBwYXJhbWV0ZXJzPzogU3FzVGFyZ2V0UGFyYW1ldGVycykge1xuICAgIHRoaXMucXVldWUgPSBxdWV1ZTtcbiAgICB0aGlzLnRhcmdldEFybiA9IHF1ZXVlLnF1ZXVlQXJuO1xuICAgIHRoaXMucXVldWVQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgfVxuICBncmFudFB1c2goZ3JhbnRlZTogSVJvbGUpOiB2b2lkIHtcbiAgICB0aGlzLnF1ZXVlLmdyYW50U2VuZE1lc3NhZ2VzKGdyYW50ZWUpO1xuICB9XG4gIGJpbmQocGlwZTogSVBpcGUpOiBUYXJnZXRDb25maWcge1xuICAgIGlmICghdGhpcy5xdWV1ZVBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldFBhcmFtZXRlcnM6IHt9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGFyZ2V0UGFyYW1ldGVyczoge1xuICAgICAgICBpbnB1dFRlbXBsYXRlOiB0aGlzLnF1ZXVlUGFyYW1ldGVycy5pbnB1dFRyYW5zZm9ybWF0aW9uPy5iaW5kKHBpcGUpLmlucHV0VGVtcGxhdGUsXG4gICAgICAgIHNxc1F1ZXVlUGFyYW1ldGVyczogdGhpcy5xdWV1ZVBhcmFtZXRlcnMsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==