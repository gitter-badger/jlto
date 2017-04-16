/**
 * @class ExpressionsHelper
 */
class ExpressionsHelper {

    constructor(options) {
        this.options = options;
        this.utils = require('./../core/utils');
    }

    getExpressionWithoutExtraSpaces(expression) {
        let body = expression.slice(this.options.expressionStart.length).slice(0, -this.options.expressionEnd.length);

        body = body.trim();

        return this.options.expressionStart + body + this.options.expressionEnd;
    }

    clearExtraSpaces(template) {
        let i;
        let startIndex = null;
        let tempSubstring;
        let resultString = '';

        for (i = 0; i < template.length + 1; i++) {
            if (!this.utils.isNull(startIndex)) {
                tempSubstring = template.substring(i - this.options.expressionEnd.length, i);
                if (tempSubstring === this.options.expressionEnd) {
                    resultString += this.getExpressionWithoutExtraSpaces(template.substring(startIndex, i));
                    startIndex = null;
                }
            }
            if (this.utils.isNull(startIndex)) {
                tempSubstring = template.substring(i, i + this.options.expressionStart.length);
                if (tempSubstring === this.options.expressionStart) {
                    startIndex = i;
                } else if (!this.utils.isUndefined(template[i])) {
                    resultString += template[i];
                }
            }
        }

        return resultString;
    }
}

module.exports = ExpressionsHelper;