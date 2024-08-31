"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaFunction = exports.LambdaFunctionInvocationType = void 0;
const jsiiDeprecationWarnings = require("../.warnings.jsii.js");
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
/**
 * InvocationType for invoking the Lambda Function.
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-pipes-pipe-pipetargetlambdafunctionparameters.html
 */
var LambdaFunctionInvocationType;
(function (LambdaFunctionInvocationType) {
    /**
     * Invoke Lambda Function asynchronously (`Invoke`). `InvocationType` is set to `Event` on `Invoke`, see https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html for more details.
     */
    LambdaFunctionInvocationType["FIRE_AND_FORGET"] = "FIRE_AND_FORGET";
    /**
     * Invoke Lambda Function synchronously (`Invoke`) and wait for the response. `InvocationType` is set to `RequestResponse` on `Invoke`, see https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html for more details.
     */
    LambdaFunctionInvocationType["REQUEST_RESPONSE"] = "REQUEST_RESPONSE";
})(LambdaFunctionInvocationType || (exports.LambdaFunctionInvocationType = LambdaFunctionInvocationType = {}));
/**
 * An EventBridge Pipes target that sends messages to an AWS Lambda Function.
 */
class LambdaFunction {
    constructor(lambdaFunction, parameters) {
        try {
            jsiiDeprecationWarnings._aws_cdk_aws_pipes_targets_alpha_LambdaFunctionParameters(parameters);
        }
        catch (error) {
            if (process.env.JSII_DEBUG !== "1" && error.name === "DeprecationError") {
                Error.captureStackTrace(error, LambdaFunction);
            }
            throw error;
        }
        this.lambdaFunction = lambdaFunction;
        this.targetArn = lambdaFunction.functionArn;
        this.invocationType =
            parameters.invocationType ??
                LambdaFunctionInvocationType.REQUEST_RESPONSE;
        this.inputTemplate = parameters.inputTransformation;
    }
    grantPush(grantee) {
        this.lambdaFunction.grantInvoke(grantee);
    }
    bind(pipe) {
        return {
            targetParameters: {
                inputTemplate: this.inputTemplate?.bind(pipe).inputTemplate,
                lambdaFunctionParameters: {
                    invocationType: this.invocationType,
                },
            },
        };
    }
}
exports.LambdaFunction = LambdaFunction;
_a = JSII_RTTI_SYMBOL_1;
LambdaFunction[_a] = { fqn: "@aws-cdk/aws-pipes-targets-alpha.LambdaFunction", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQTBCQTs7O0dBR0c7QUFDSCxJQUFZLDRCQVVYO0FBVkQsV0FBWSw0QkFBNEI7SUFDdEM7O09BRUc7SUFDSCxtRUFBbUMsQ0FBQTtJQUVuQzs7T0FFRztJQUNILHFFQUFxQyxDQUFBO0FBQ3ZDLENBQUMsRUFWVyw0QkFBNEIsNENBQTVCLDRCQUE0QixRQVV2QztBQUVEOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0lBT3pCLFlBQ0UsY0FBZ0MsRUFDaEMsVUFBb0M7Ozs7OzsrQ0FUM0IsY0FBYzs7OztRQVd2QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWM7WUFDakIsVUFBVSxDQUFDLGNBQWM7Z0JBQ3pCLDRCQUE0QixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixDQUFDO0tBQ3JEO0lBRUQsU0FBUyxDQUFDLE9BQWM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLENBQUMsSUFBVztRQUNkLE9BQU87WUFDTCxnQkFBZ0IsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWE7Z0JBQzNELHdCQUF3QixFQUFFO29CQUN4QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7aUJBQ3BDO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7O0FBaENILHdDQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbnB1dFRyYW5zZm9ybWF0aW9uLCBJUGlwZSwgSVRhcmdldCwgVGFyZ2V0Q29uZmlnIH0gZnJvbSAnQGF3cy1jZGsvYXdzLXBpcGVzLWFscGhhJztcbmltcG9ydCB7IElSb2xlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5cbi8qKlxuICogUGFyYW1ldGVycyBmb3IgdGhlIExhbWJkYUZ1bmN0aW9uIHRhcmdldFxuICovXG5leHBvcnQgaW50ZXJmYWNlIExhbWJkYUZ1bmN0aW9uUGFyYW1ldGVycyB7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnB1dCB0cmFuc2Zvcm1hdGlvbiB0byBhcHBseSB0byB0aGUgbWVzc2FnZSBiZWZvcmUgc2VuZGluZyBpdCB0byB0aGUgdGFyZ2V0LlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BV1NDbG91ZEZvcm1hdGlvbi9sYXRlc3QvVXNlckd1aWRlL2F3cy1wcm9wZXJ0aWVzLXBpcGVzLXBpcGUtcGlwZXRhcmdldHBhcmFtZXRlcnMuaHRtbCNjZm4tcGlwZXMtcGlwZS1waXBldGFyZ2V0cGFyYW1ldGVycy1pbnB1dHRlbXBsYXRlXG4gICAqIEBkZWZhdWx0IG5vbmVcbiAgICovXG4gIHJlYWRvbmx5IGlucHV0VHJhbnNmb3JtYXRpb24/OiBJSW5wdXRUcmFuc2Zvcm1hdGlvbjtcblxuICAvKipcbiAgICogU3BlY2lmeSB3aGV0aGVyIHRvIGludm9rZSB0aGUgTGFtYmRhIEZ1bmN0aW9uIHN5bmNocm9ub3VzbHkgKGBSRVFVRVNUX1JFU1BPTlNFYCkgb3IgYXN5bmNocm9ub3VzbHkgKGBGSVJFX0FORF9GT1JHRVRgKS5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQVdTQ2xvdWRGb3JtYXRpb24vbGF0ZXN0L1VzZXJHdWlkZS9hd3MtcHJvcGVydGllcy1waXBlcy1waXBlLXBpcGV0YXJnZXRsYW1iZGFmdW5jdGlvbnBhcmFtZXRlcnMuaHRtbFxuICAgKiBAZGVmYXVsdCBMYW1iZGFGdW5jdGlvbkludm9jYXRpb25UeXBlLlJFUVVFU1RfUkVTUE9OU0VcbiAgICovXG4gIHJlYWRvbmx5IGludm9jYXRpb25UeXBlPzogTGFtYmRhRnVuY3Rpb25JbnZvY2F0aW9uVHlwZTtcbn1cblxuLyoqXG4gKiBJbnZvY2F0aW9uVHlwZSBmb3IgaW52b2tpbmcgdGhlIExhbWJkYSBGdW5jdGlvbi5cbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0Nsb3VkRm9ybWF0aW9uL2xhdGVzdC9Vc2VyR3VpZGUvYXdzLXByb3BlcnRpZXMtcGlwZXMtcGlwZS1waXBldGFyZ2V0bGFtYmRhZnVuY3Rpb25wYXJhbWV0ZXJzLmh0bWxcbiAqL1xuZXhwb3J0IGVudW0gTGFtYmRhRnVuY3Rpb25JbnZvY2F0aW9uVHlwZSB7XG4gIC8qKlxuICAgKiBJbnZva2UgTGFtYmRhIEZ1bmN0aW9uIGFzeW5jaHJvbm91c2x5IChgSW52b2tlYCkuIGBJbnZvY2F0aW9uVHlwZWAgaXMgc2V0IHRvIGBFdmVudGAgb24gYEludm9rZWAsIHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vbGFtYmRhL2xhdGVzdC9hcGkvQVBJX0ludm9rZS5odG1sIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBGSVJFX0FORF9GT1JHRVQgPSAnRklSRV9BTkRfRk9SR0VUJyxcblxuICAvKipcbiAgICogSW52b2tlIExhbWJkYSBGdW5jdGlvbiBzeW5jaHJvbm91c2x5IChgSW52b2tlYCkgYW5kIHdhaXQgZm9yIHRoZSByZXNwb25zZS4gYEludm9jYXRpb25UeXBlYCBpcyBzZXQgdG8gYFJlcXVlc3RSZXNwb25zZWAgb24gYEludm9rZWAsIHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vbGFtYmRhL2xhdGVzdC9hcGkvQVBJX0ludm9rZS5odG1sIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBSRVFVRVNUX1JFU1BPTlNFID0gJ1JFUVVFU1RfUkVTUE9OU0UnLFxufVxuXG4vKipcbiAqIEFuIEV2ZW50QnJpZGdlIFBpcGVzIHRhcmdldCB0aGF0IHNlbmRzIG1lc3NhZ2VzIHRvIGFuIEFXUyBMYW1iZGEgRnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBMYW1iZGFGdW5jdGlvbiBpbXBsZW1lbnRzIElUYXJnZXQge1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0QXJuOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBsYW1iZGFGdW5jdGlvbjogbGFtYmRhLklGdW5jdGlvbjtcbiAgcHJpdmF0ZSByZWFkb25seSBpbnZvY2F0aW9uVHlwZTogTGFtYmRhRnVuY3Rpb25JbnZvY2F0aW9uVHlwZTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbnB1dFRlbXBsYXRlPzogSUlucHV0VHJhbnNmb3JtYXRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbGFtYmRhRnVuY3Rpb246IGxhbWJkYS5JRnVuY3Rpb24sXG4gICAgcGFyYW1ldGVyczogTGFtYmRhRnVuY3Rpb25QYXJhbWV0ZXJzLFxuICApIHtcbiAgICB0aGlzLmxhbWJkYUZ1bmN0aW9uID0gbGFtYmRhRnVuY3Rpb247XG4gICAgdGhpcy50YXJnZXRBcm4gPSBsYW1iZGFGdW5jdGlvbi5mdW5jdGlvbkFybjtcbiAgICB0aGlzLmludm9jYXRpb25UeXBlID1cbiAgICAgIHBhcmFtZXRlcnMuaW52b2NhdGlvblR5cGUgPz9cbiAgICAgIExhbWJkYUZ1bmN0aW9uSW52b2NhdGlvblR5cGUuUkVRVUVTVF9SRVNQT05TRTtcbiAgICB0aGlzLmlucHV0VGVtcGxhdGUgPSBwYXJhbWV0ZXJzLmlucHV0VHJhbnNmb3JtYXRpb247XG4gIH1cblxuICBncmFudFB1c2goZ3JhbnRlZTogSVJvbGUpOiB2b2lkIHtcbiAgICB0aGlzLmxhbWJkYUZ1bmN0aW9uLmdyYW50SW52b2tlKGdyYW50ZWUpO1xuICB9XG5cbiAgYmluZChwaXBlOiBJUGlwZSk6IFRhcmdldENvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhcmdldFBhcmFtZXRlcnM6IHtcbiAgICAgICAgaW5wdXRUZW1wbGF0ZTogdGhpcy5pbnB1dFRlbXBsYXRlPy5iaW5kKHBpcGUpLmlucHV0VGVtcGxhdGUsXG4gICAgICAgIGxhbWJkYUZ1bmN0aW9uUGFyYW1ldGVyczoge1xuICAgICAgICAgIGludm9jYXRpb25UeXBlOiB0aGlzLmludm9jYXRpb25UeXBlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59XG4iXX0=