"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetParameter = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
/**
 * Define dynamic target parameters.
 */
class TargetParameter {
    /**
     * Target parameter based on a jsonPath expression from the incoming event.
     */
    static fromJsonPath(jsonPath) {
        if (!jsonPath.startsWith('$.')) {
            throw new Error('JsonPath must start with "$."');
        }
        return `<${jsonPath}>`;
    }
}
exports.TargetParameter = TargetParameter;
_a = JSII_RTTI_SYMBOL_1;
TargetParameter[_a] = { fqn: "@aws-cdk/aws-pipes-alpha.TargetParameter", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0UGFyYW1ldGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFyZ2V0UGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0dBRUc7QUFDSCxNQUFhLGVBQWU7SUFDMUI7O09BRUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxPQUFPLElBQUksUUFBUSxHQUFHLENBQUM7S0FDeEI7O0FBVEgsMENBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmluZSBkeW5hbWljIHRhcmdldCBwYXJhbWV0ZXJzLlxuICovXG5leHBvcnQgY2xhc3MgVGFyZ2V0UGFyYW1ldGVyIHtcbiAgLyoqXG4gICAqIFRhcmdldCBwYXJhbWV0ZXIgYmFzZWQgb24gYSBqc29uUGF0aCBleHByZXNzaW9uIGZyb20gdGhlIGluY29taW5nIGV2ZW50LlxuICAgKi9cbiAgc3RhdGljIGZyb21Kc29uUGF0aChqc29uUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWpzb25QYXRoLnN0YXJ0c1dpdGgoJyQuJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSnNvblBhdGggbXVzdCBzdGFydCB3aXRoIFwiJC5cIicpO1xuICAgIH1cbiAgICByZXR1cm4gYDwke2pzb25QYXRofT5gO1xuICB9XG5cbn1cbiJdfQ==