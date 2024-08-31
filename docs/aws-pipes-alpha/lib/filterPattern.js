"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterPattern = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
/**
 * Generate a filter pattern from an input.
 */
class FilterPattern {
    /**
     * Generates a filter pattern from a JSON object.
     */
    static fromObject(patternObject) {
        return { pattern: JSON.stringify(patternObject) };
    }
}
exports.FilterPattern = FilterPattern;
_a = JSII_RTTI_SYMBOL_1;
FilterPattern[_a] = { fqn: "@aws-cdk/aws-pipes-alpha.FilterPattern", version: "2.155.0-alpha.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyUGF0dGVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbHRlclBhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQTs7R0FFRztBQUNILE1BQWEsYUFBYTtJQUN4Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBa0M7UUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7S0FDbkQ7O0FBTkgsc0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRmlsdGVyUGF0dGVybiB9IGZyb20gJy4vZmlsdGVyJztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGZpbHRlciBwYXR0ZXJuIGZyb20gYW4gaW5wdXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWx0ZXJQYXR0ZXJuIHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGZpbHRlciBwYXR0ZXJuIGZyb20gYSBKU09OIG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyBmcm9tT2JqZWN0KHBhdHRlcm5PYmplY3Q6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBJRmlsdGVyUGF0dGVybiB7XG4gICAgcmV0dXJuIHsgcGF0dGVybjogSlNPTi5zdHJpbmdpZnkocGF0dGVybk9iamVjdCkgfTtcbiAgfVxufVxuIl19