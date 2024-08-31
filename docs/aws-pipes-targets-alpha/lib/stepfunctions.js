"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SfnStateMachine = exports.StateMachineInvocationType = void 0;
const jsiiDeprecationWarnings = require("../.warnings.jsii.js");
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_stepfunctions_1 = require("aws-cdk-lib/aws-stepfunctions");
/**
 * InvocationType for invoking the State Machine.
 * @see https://docs.aws.amazon.com/eventbridge/latest/pipes-reference/API_PipeTargetStateMachineParameters.html
 */
var StateMachineInvocationType;
(function (StateMachineInvocationType) {
    /**
     * Invoke StepFunction asynchronously (`StartExecution`). See https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartExecution.html for more details.
     */
    StateMachineInvocationType["FIRE_AND_FORGET"] = "FIRE_AND_FORGET";
    /**
     * Invoke StepFunction synchronously (`StartSyncExecution`) and wait for the execution to complete. See https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartSyncExecution.html for more details.
     */
    StateMachineInvocationType["REQUEST_RESPONSE"] = "REQUEST_RESPONSE";
})(StateMachineInvocationType || (exports.StateMachineInvocationType = StateMachineInvocationType = {}));
/**
 * An EventBridge Pipes target that sends messages to an AWS Step Functions State Machine.
 */
class SfnStateMachine {
    constructor(stateMachine, parameters) {
        try {
            jsiiDeprecationWarnings._aws_cdk_aws_pipes_targets_alpha_SfnStateMachineParameters(parameters);
        }
        catch (error) {
            if (process.env.JSII_DEBUG !== "1" && error.name === "DeprecationError") {
                Error.captureStackTrace(error, SfnStateMachine);
            }
            throw error;
        }
        this.stateMachine = stateMachine;
        this.targetArn = stateMachine.stateMachineArn;
        this.invocationType = parameters.invocationType ?? StateMachineInvocationType.FIRE_AND_FORGET;
        this.inputTemplate = parameters.inputTransformation;
        if (this.stateMachine instanceof aws_stepfunctions_1.StateMachine
            && this.stateMachine.stateMachineType === aws_stepfunctions_1.StateMachineType.STANDARD
            && this.invocationType === StateMachineInvocationType.REQUEST_RESPONSE) {
            throw new Error('STANDARD state machine workflows do not support the REQUEST_RESPONSE invocation type. Use FIRE_AND_FORGET instead.');
        }
    }
    grantPush(grantee) {
        if (this.invocationType === StateMachineInvocationType.FIRE_AND_FORGET) {
            this.stateMachine.grantStartExecution(grantee);
        }
        else {
            this.stateMachine.grantStartSyncExecution(grantee);
        }
    }
    bind(pipe) {
        return {
            targetParameters: {
                inputTemplate: this.inputTemplate?.bind(pipe).inputTemplate,
                stepFunctionStateMachineParameters: {
                    invocationType: this.invocationType,
                },
            },
        };
    }
}
exports.SfnStateMachine = SfnStateMachine;
_a = JSII_RTTI_SYMBOL_1;
SfnStateMachine[_a] = { fqn: "@aws-cdk/aws-pipes-targets-alpha.SfnStateMachine", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcGZ1bmN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0ZXBmdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EscUVBQStFO0FBdUIvRTs7O0dBR0c7QUFDSCxJQUFZLDBCQVVYO0FBVkQsV0FBWSwwQkFBMEI7SUFDcEM7O09BRUc7SUFDSCxpRUFBbUMsQ0FBQTtJQUVuQzs7T0FFRztJQUNILG1FQUFxQyxDQUFBO0FBQ3ZDLENBQUMsRUFWVywwQkFBMEIsMENBQTFCLDBCQUEwQixRQVVyQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxlQUFlO0lBTzFCLFlBQVksWUFBK0IsRUFBRSxVQUFxQzs7Ozs7OytDQVB2RSxlQUFlOzs7O1FBUXhCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxjQUFjLElBQUcsMEJBQTBCLENBQUMsZUFBZSxDQUFDO1FBQzdGLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1FBRXBELElBQUksSUFBSSxDQUFDLFlBQVksWUFBWSxnQ0FBWTtlQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixLQUFLLG9DQUFnQixDQUFDLFFBQVE7ZUFDaEUsSUFBSSxDQUFDLGNBQWMsS0FBSywwQkFBMEIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0hBQW9ILENBQUMsQ0FBQztRQUN4SSxDQUFDO0tBQ0Y7SUFFRCxTQUFTLENBQUMsT0FBYztRQUN0QixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssMEJBQTBCLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUNGO0lBRUQsSUFBSSxDQUFDLElBQVc7UUFDZCxPQUFPO1lBQ0wsZ0JBQWdCLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhO2dCQUMzRCxrQ0FBa0MsRUFBRTtvQkFDbEMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUNwQzthQUNGO1NBQ0YsQ0FBQztLQUNIOztBQXJDSCwwQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJSW5wdXRUcmFuc2Zvcm1hdGlvbiwgSVBpcGUsIElUYXJnZXQsIFRhcmdldENvbmZpZyB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1waXBlcy1hbHBoYSc7XG5pbXBvcnQgeyBJUm9sZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0ICogYXMgc2ZuIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zdGVwZnVuY3Rpb25zJztcbmltcG9ydCB7IFN0YXRlTWFjaGluZSwgU3RhdGVNYWNoaW5lVHlwZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zdGVwZnVuY3Rpb25zJztcblxuLyoqXG4gKiBQYXJhbWV0ZXJzIGZvciB0aGUgU2ZuU3RhdGVNYWNoaW5lIHRhcmdldFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNmblN0YXRlTWFjaGluZVBhcmFtZXRlcnMge1xuICAvKipcbiAgICogVGhlIGlucHV0IHRyYW5zZm9ybWF0aW9uIHRvIGFwcGx5IHRvIHRoZSBtZXNzYWdlIGJlZm9yZSBzZW5kaW5nIGl0IHRvIHRoZSB0YXJnZXQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL0FXU0Nsb3VkRm9ybWF0aW9uL2xhdGVzdC9Vc2VyR3VpZGUvYXdzLXByb3BlcnRpZXMtcGlwZXMtcGlwZS1waXBldGFyZ2V0cGFyYW1ldGVycy5odG1sI2Nmbi1waXBlcy1waXBlLXBpcGV0YXJnZXRwYXJhbWV0ZXJzLWlucHV0dGVtcGxhdGVcbiAgICogQGRlZmF1bHQgbm9uZVxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXRUcmFuc2Zvcm1hdGlvbj86IElJbnB1dFRyYW5zZm9ybWF0aW9uO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gaW52b2tlIHRoZSBTdGF0ZSBNYWNoaW5lIHN5bmNocm9ub3VzbHkgKGBSRVFVRVNUX1JFU1BPTlNFYCkgb3IgYXN5bmNocm9ub3VzbHkgKGBGSVJFX0FORF9GT1JHRVRgKS5cbiAgICpcbiAgICogQHNlZSBodHRwOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BV1NDbG91ZEZvcm1hdGlvbi9sYXRlc3QvVXNlckd1aWRlL2F3cy1wcm9wZXJ0aWVzLXBpcGVzLXBpcGUtcGlwZXRhcmdldHNxc3F1ZXVlcGFyYW1ldGVycy5odG1sI2Nmbi1waXBlcy1waXBlLXBpcGV0YXJnZXRzcXNxdWV1ZXBhcmFtZXRlcnMtbWVzc2FnZWRlZHVwbGljYXRpb25pZFxuICAgKiBAZGVmYXVsdCBTdGF0ZU1hY2hpbmVJbnZvY2F0aW9uVHlwZS5GSVJFX0FORF9GT1JHRVRcbiAgICovXG4gIHJlYWRvbmx5IGludm9jYXRpb25UeXBlPzogU3RhdGVNYWNoaW5lSW52b2NhdGlvblR5cGU7XG59XG5cbi8qKlxuICogSW52b2NhdGlvblR5cGUgZm9yIGludm9raW5nIHRoZSBTdGF0ZSBNYWNoaW5lLlxuICogQHNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vZXZlbnRicmlkZ2UvbGF0ZXN0L3BpcGVzLXJlZmVyZW5jZS9BUElfUGlwZVRhcmdldFN0YXRlTWFjaGluZVBhcmFtZXRlcnMuaHRtbFxuICovXG5leHBvcnQgZW51bSBTdGF0ZU1hY2hpbmVJbnZvY2F0aW9uVHlwZSB7XG4gIC8qKlxuICAgKiBJbnZva2UgU3RlcEZ1bmN0aW9uIGFzeW5jaHJvbm91c2x5IChgU3RhcnRFeGVjdXRpb25gKS4gU2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9zdGVwLWZ1bmN0aW9ucy9sYXRlc3QvYXBpcmVmZXJlbmNlL0FQSV9TdGFydEV4ZWN1dGlvbi5odG1sIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBGSVJFX0FORF9GT1JHRVQgPSAnRklSRV9BTkRfRk9SR0VUJyxcblxuICAvKipcbiAgICogSW52b2tlIFN0ZXBGdW5jdGlvbiBzeW5jaHJvbm91c2x5IChgU3RhcnRTeW5jRXhlY3V0aW9uYCkgYW5kIHdhaXQgZm9yIHRoZSBleGVjdXRpb24gdG8gY29tcGxldGUuIFNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vc3RlcC1mdW5jdGlvbnMvbGF0ZXN0L2FwaXJlZmVyZW5jZS9BUElfU3RhcnRTeW5jRXhlY3V0aW9uLmh0bWwgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIFJFUVVFU1RfUkVTUE9OU0UgPSAnUkVRVUVTVF9SRVNQT05TRScsXG59XG5cbi8qKlxuICogQW4gRXZlbnRCcmlkZ2UgUGlwZXMgdGFyZ2V0IHRoYXQgc2VuZHMgbWVzc2FnZXMgdG8gYW4gQVdTIFN0ZXAgRnVuY3Rpb25zIFN0YXRlIE1hY2hpbmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZm5TdGF0ZU1hY2hpbmUgaW1wbGVtZW50cyBJVGFyZ2V0IHtcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldEFybjogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdGVNYWNoaW5lOiBzZm4uSVN0YXRlTWFjaGluZTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbnZvY2F0aW9uVHlwZTogU3RhdGVNYWNoaW5lSW52b2NhdGlvblR5cGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5wdXRUZW1wbGF0ZT86IElJbnB1dFRyYW5zZm9ybWF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlTWFjaGluZTogc2ZuLklTdGF0ZU1hY2hpbmUsIHBhcmFtZXRlcnM6IFNmblN0YXRlTWFjaGluZVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnN0YXRlTWFjaGluZSA9IHN0YXRlTWFjaGluZTtcbiAgICB0aGlzLnRhcmdldEFybiA9IHN0YXRlTWFjaGluZS5zdGF0ZU1hY2hpbmVBcm47XG4gICAgdGhpcy5pbnZvY2F0aW9uVHlwZSA9IHBhcmFtZXRlcnMuaW52b2NhdGlvblR5cGU/PyBTdGF0ZU1hY2hpbmVJbnZvY2F0aW9uVHlwZS5GSVJFX0FORF9GT1JHRVQ7XG4gICAgdGhpcy5pbnB1dFRlbXBsYXRlID0gcGFyYW1ldGVycy5pbnB1dFRyYW5zZm9ybWF0aW9uO1xuXG4gICAgaWYgKHRoaXMuc3RhdGVNYWNoaW5lIGluc3RhbmNlb2YgU3RhdGVNYWNoaW5lXG4gICAgICAmJiB0aGlzLnN0YXRlTWFjaGluZS5zdGF0ZU1hY2hpbmVUeXBlID09PSBTdGF0ZU1hY2hpbmVUeXBlLlNUQU5EQVJEXG4gICAgICAmJiB0aGlzLmludm9jYXRpb25UeXBlID09PSBTdGF0ZU1hY2hpbmVJbnZvY2F0aW9uVHlwZS5SRVFVRVNUX1JFU1BPTlNFKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NUQU5EQVJEIHN0YXRlIG1hY2hpbmUgd29ya2Zsb3dzIGRvIG5vdCBzdXBwb3J0IHRoZSBSRVFVRVNUX1JFU1BPTlNFIGludm9jYXRpb24gdHlwZS4gVXNlIEZJUkVfQU5EX0ZPUkdFVCBpbnN0ZWFkLicpO1xuICAgIH1cbiAgfVxuXG4gIGdyYW50UHVzaChncmFudGVlOiBJUm9sZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmludm9jYXRpb25UeXBlID09PSBTdGF0ZU1hY2hpbmVJbnZvY2F0aW9uVHlwZS5GSVJFX0FORF9GT1JHRVQpIHtcbiAgICAgIHRoaXMuc3RhdGVNYWNoaW5lLmdyYW50U3RhcnRFeGVjdXRpb24oZ3JhbnRlZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGVNYWNoaW5lLmdyYW50U3RhcnRTeW5jRXhlY3V0aW9uKGdyYW50ZWUpO1xuICAgIH1cbiAgfVxuXG4gIGJpbmQocGlwZTogSVBpcGUpOiBUYXJnZXRDb25maWcge1xuICAgIHJldHVybiB7XG4gICAgICB0YXJnZXRQYXJhbWV0ZXJzOiB7XG4gICAgICAgIGlucHV0VGVtcGxhdGU6IHRoaXMuaW5wdXRUZW1wbGF0ZT8uYmluZChwaXBlKS5pbnB1dFRlbXBsYXRlLFxuICAgICAgICBzdGVwRnVuY3Rpb25TdGF0ZU1hY2hpbmVQYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgaW52b2NhdGlvblR5cGU6IHRoaXMuaW52b2NhdGlvblR5cGUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==