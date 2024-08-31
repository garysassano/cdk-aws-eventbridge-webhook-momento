"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTransformation = void 0;
const jsiiDeprecationWarnings = require("../.warnings.jsii.js");
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const unquote_1 = require("./unquote");
var TemplateType;
(function (TemplateType) {
    TemplateType["TEXT"] = "Text";
    TemplateType["OBJECT"] = "Object";
})(TemplateType || (TemplateType = {}));
/**
 * Transform or replace the input event payload
 */
class InputTransformation {
    /**
     * Creates an InputTransformation from a string.
     */
    static fromText(inputTemplate) {
        return new InputTransformation(inputTemplate, TemplateType.TEXT);
    }
    /**
     * Creates an InputTransformation from a jsonPath expression of the input event.
     */
    static fromEventPath(jsonPathExpression) {
        if (!jsonPathExpression.startsWith('$.')) {
            throw new Error('jsonPathExpression start with "$."');
        }
        const jsonPath = `<${jsonPathExpression}>`;
        return new InputTransformation(jsonPath, TemplateType.TEXT);
    }
    /**
     * Creates an InputTransformation from a pipe variable.
     */
    static fromObject(inputTemplate) {
        return new InputTransformation(inputTemplate, TemplateType.OBJECT);
    }
    constructor(inputTemplate, type) {
        this.type = type;
        this.inputTemplate = inputTemplate;
    }
    bind(pipe) {
        try {
            jsiiDeprecationWarnings._aws_cdk_aws_pipes_alpha_IPipe(pipe);
        }
        catch (error) {
            if (process.env.JSII_DEBUG !== "1" && error.name === "DeprecationError") {
                Error.captureStackTrace(error, this.bind);
            }
            throw error;
        }
        if (this.type === 'Text') {
            return { inputTemplate: this.inputTemplate };
        }
        const stringifiedJsonWithUnresolvedTokens = pipe.stack.toJsonString(this.inputTemplate);
        const resolved = aws_cdk_lib_1.Tokenization.resolve(stringifiedJsonWithUnresolvedTokens, {
            scope: pipe,
            resolver: new aws_cdk_lib_1.DefaultTokenResolver(new aws_cdk_lib_1.StringConcat()),
        });
        return { inputTemplate: this.unquoteDynamicInputs(resolved) };
    }
    unquoteDynamicInputs(sub) {
        return aws_cdk_lib_1.Lazy.uncachedString({ produce: (ctx) => aws_cdk_lib_1.Token.asString(deepUnquote(ctx.resolve(sub))) });
        /**
         * Removes the quotes from the values that are in the keys array
         *
         * @param resolved the resolved object containing the dynamic fields with quotes. In cases where a cloudformation intrinsic function is used, the resolved value will be an object.
         * @returns the resolved object with the dynamic fields without quotes
         */
        function deepUnquote(resolved) {
            if (Array.isArray(resolved)) {
                return resolved.map(deepUnquote);
            }
            if (typeof (resolved) === 'object' && resolved !== null) {
                for (const [key, value] of Object.entries(resolved)) {
                    resolved[key] = deepUnquote(value);
                }
            }
            if (typeof resolved === 'string') {
                return (0, unquote_1.unquote)(resolved);
            }
            return resolved;
        }
    }
}
exports.InputTransformation = InputTransformation;
_a = JSII_RTTI_SYMBOL_1;
InputTransformation[_a] = { fqn: "@aws-cdk/aws-pipes-alpha.InputTransformation", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRUcmFuc2Zvcm1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlucHV0VHJhbnNmb3JtYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkNBQTZHO0FBRTdHLHVDQUFvQztBQXdCcEMsSUFBSyxZQUdKO0FBSEQsV0FBSyxZQUFZO0lBQ2YsNkJBQWEsQ0FBQTtJQUNiLGlDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFISSxZQUFZLEtBQVosWUFBWSxRQUdoQjtBQUVEOztHQUVHO0FBQ0gsTUFBYSxtQkFBbUI7SUFDOUI7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQXFCO1FBQ25DLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xFO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUEwQjtRQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFrQixHQUFHLENBQUM7UUFDM0MsT0FBTyxJQUFJLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0Q7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBa0M7UUFDbEQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEU7SUFTRCxZQUFvQixhQUF1QyxFQUFFLElBQWtCO1FBQzdFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0tBQ3BDO0lBRU0sSUFBSSxDQUFDLElBQVc7Ozs7Ozs7Ozs7UUFFckIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQXVCLEVBQUUsQ0FBQztRQUN6RCxDQUFDO1FBRUQsTUFBTSxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEYsTUFBTSxRQUFRLEdBQUcsMEJBQVksQ0FBQyxPQUFPLENBQUMsbUNBQW1DLEVBQUU7WUFDekUsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsSUFBSSxrQ0FBb0IsQ0FBQyxJQUFJLDBCQUFZLEVBQUUsQ0FBQztTQUN2RCxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0tBQy9EO0lBRU8sb0JBQW9CLENBQUMsR0FBVztRQUV0QyxPQUFPLGtCQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBb0IsRUFBRSxFQUFFLENBQUMsbUJBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqSDs7Ozs7V0FLRztRQUNILFNBQVMsV0FBVyxDQUFDLFFBQWE7WUFDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsSUFBSSxPQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDdkQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNqQyxPQUFPLElBQUEsaUJBQU8sRUFBQyxRQUFRLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztLQUNGOztBQTlFSCxrREErRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0VG9rZW5SZXNvbHZlciwgSVJlc29sdmVDb250ZXh0LCBMYXp5LCBTdHJpbmdDb25jYXQsIFRva2VuLCBUb2tlbml6YXRpb24gfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBJUGlwZSB9IGZyb20gJy4vcGlwZSc7XG5pbXBvcnQgeyB1bnF1b3RlIH0gZnJvbSAnLi91bnF1b3RlJztcblxudHlwZSBJbnB1dFRyYW5zZm9ybWF0aW9uVmFsdWUgPSBzdHJpbmcgfCBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuXG4vKipcbiAqIFRoZSBpbnB1dFRlbXBsYXRlIHRoYXQgaXMgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGlucHV0IGV2ZW50IHBheWxvYWQgd2l0aCB1bnF1b3RlZCB2YXJpYWJsZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbnB1dFRyYW5zZm9ybWF0aW9uQ29uZmlnIHtcbiAgLyoqXG4gICAqIFRoZSBpbnB1dFRlbXBsYXRlIHRoYXQgaXMgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGlucHV0IGV2ZW50IHBheWxvYWRcbiAgICovXG4gIHJlYWRvbmx5IGlucHV0VGVtcGxhdGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gb3IgcmVwbGFjZSB0aGUgaW5wdXQgZXZlbnQgcGF5bG9hZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElJbnB1dFRyYW5zZm9ybWF0aW9uIHtcbiAgLyoqXG4gICAqIEJpbmQgdGhlIGlucHV0IHRyYW5zZm9ybWF0aW9uIHRvIHRoZSBwaXBlIGFuZCByZXR1cm5zIHRoZSBpbnB1dFRlbXBsYXRlIHN0cmluZy5cbiAgICovXG4gIGJpbmQocGlwZTogSVBpcGUpOiBJbnB1dFRyYW5zZm9ybWF0aW9uQ29uZmlnO1xufVxuXG5lbnVtIFRlbXBsYXRlVHlwZSB7XG4gIFRFWFQgPSAnVGV4dCcsXG4gIE9CSkVDVCA9ICdPYmplY3QnLFxufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBvciByZXBsYWNlIHRoZSBpbnB1dCBldmVudCBwYXlsb2FkXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnB1dFRyYW5zZm9ybWF0aW9uIGltcGxlbWVudHMgSUlucHV0VHJhbnNmb3JtYXRpb24ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBJbnB1dFRyYW5zZm9ybWF0aW9uIGZyb20gYSBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgZnJvbVRleHQoaW5wdXRUZW1wbGF0ZTogc3RyaW5nKTogSW5wdXRUcmFuc2Zvcm1hdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBJbnB1dFRyYW5zZm9ybWF0aW9uKGlucHV0VGVtcGxhdGUsIFRlbXBsYXRlVHlwZS5URVhUKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIElucHV0VHJhbnNmb3JtYXRpb24gZnJvbSBhIGpzb25QYXRoIGV4cHJlc3Npb24gb2YgdGhlIGlucHV0IGV2ZW50LlxuICAgKi9cbiAgc3RhdGljIGZyb21FdmVudFBhdGgoanNvblBhdGhFeHByZXNzaW9uOiBzdHJpbmcpOiBJbnB1dFRyYW5zZm9ybWF0aW9uIHtcbiAgICBpZiAoIWpzb25QYXRoRXhwcmVzc2lvbi5zdGFydHNXaXRoKCckLicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2pzb25QYXRoRXhwcmVzc2lvbiBzdGFydCB3aXRoIFwiJC5cIicpO1xuICAgIH1cbiAgICBjb25zdCBqc29uUGF0aCA9IGA8JHtqc29uUGF0aEV4cHJlc3Npb259PmA7XG4gICAgcmV0dXJuIG5ldyBJbnB1dFRyYW5zZm9ybWF0aW9uKGpzb25QYXRoLCBUZW1wbGF0ZVR5cGUuVEVYVCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBJbnB1dFRyYW5zZm9ybWF0aW9uIGZyb20gYSBwaXBlIHZhcmlhYmxlLlxuICAgKi9cbiAgc3RhdGljIGZyb21PYmplY3QoaW5wdXRUZW1wbGF0ZTogUmVjb3JkPHN0cmluZywgYW55Pik6IElucHV0VHJhbnNmb3JtYXRpb24ge1xuICAgIHJldHVybiBuZXcgSW5wdXRUcmFuc2Zvcm1hdGlvbihpbnB1dFRlbXBsYXRlLCBUZW1wbGF0ZVR5cGUuT0JKRUNUKTtcbiAgfVxuXG4gIHByaXZhdGUgdHlwZSA6IFRlbXBsYXRlVHlwZTtcblxuICAvKipcbiAgICogVGhlIGlucHV0VGVtcGxhdGUgdGhhdCBpcyB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgaW5wdXQgZXZlbnQgcGF5bG9hZFxuICAgKi9cbiAgcHJpdmF0ZSBpbnB1dFRlbXBsYXRlOiBJbnB1dFRyYW5zZm9ybWF0aW9uVmFsdWU7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihpbnB1dFRlbXBsYXRlOiBJbnB1dFRyYW5zZm9ybWF0aW9uVmFsdWUsIHR5cGU6IFRlbXBsYXRlVHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pbnB1dFRlbXBsYXRlID0gaW5wdXRUZW1wbGF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kKHBpcGU6IElQaXBlKTogSW5wdXRUcmFuc2Zvcm1hdGlvbkNvbmZpZyB7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnVGV4dCcpIHtcbiAgICAgIHJldHVybiB7IGlucHV0VGVtcGxhdGU6IHRoaXMuaW5wdXRUZW1wbGF0ZSBhcyBzdHJpbmcgfTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJpbmdpZmllZEpzb25XaXRoVW5yZXNvbHZlZFRva2VucyA9IHBpcGUuc3RhY2sudG9Kc29uU3RyaW5nKHRoaXMuaW5wdXRUZW1wbGF0ZSk7XG4gICAgY29uc3QgcmVzb2x2ZWQgPSBUb2tlbml6YXRpb24ucmVzb2x2ZShzdHJpbmdpZmllZEpzb25XaXRoVW5yZXNvbHZlZFRva2Vucywge1xuICAgICAgc2NvcGU6IHBpcGUsXG4gICAgICByZXNvbHZlcjogbmV3IERlZmF1bHRUb2tlblJlc29sdmVyKG5ldyBTdHJpbmdDb25jYXQoKSksXG4gICAgfSk7XG4gICAgcmV0dXJuIHsgaW5wdXRUZW1wbGF0ZTogdGhpcy51bnF1b3RlRHluYW1pY0lucHV0cyhyZXNvbHZlZCkgfTtcbiAgfVxuXG4gIHByaXZhdGUgdW5xdW90ZUR5bmFtaWNJbnB1dHMoc3ViOiBzdHJpbmcpIHtcblxuICAgIHJldHVybiBMYXp5LnVuY2FjaGVkU3RyaW5nKHsgcHJvZHVjZTogKGN0eDogSVJlc29sdmVDb250ZXh0KSA9PiBUb2tlbi5hc1N0cmluZyhkZWVwVW5xdW90ZShjdHgucmVzb2x2ZShzdWIpKSkgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBxdW90ZXMgZnJvbSB0aGUgdmFsdWVzIHRoYXQgYXJlIGluIHRoZSBrZXlzIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb2x2ZWQgdGhlIHJlc29sdmVkIG9iamVjdCBjb250YWluaW5nIHRoZSBkeW5hbWljIGZpZWxkcyB3aXRoIHF1b3Rlcy4gSW4gY2FzZXMgd2hlcmUgYSBjbG91ZGZvcm1hdGlvbiBpbnRyaW5zaWMgZnVuY3Rpb24gaXMgdXNlZCwgdGhlIHJlc29sdmVkIHZhbHVlIHdpbGwgYmUgYW4gb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHRoZSByZXNvbHZlZCBvYmplY3Qgd2l0aCB0aGUgZHluYW1pYyBmaWVsZHMgd2l0aG91dCBxdW90ZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWVwVW5xdW90ZShyZXNvbHZlZDogYW55KTogYW55IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc29sdmVkKSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQubWFwKGRlZXBVbnF1b3RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZihyZXNvbHZlZCkgPT09ICdvYmplY3QnICYmIHJlc29sdmVkICE9PSBudWxsKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHJlc29sdmVkKSkge1xuICAgICAgICAgIHJlc29sdmVkW2tleV0gPSBkZWVwVW5xdW90ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1bnF1b3RlKHJlc29sdmVkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbiAgfVxufVxuXG4iXX0=