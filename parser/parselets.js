define(["./expressions"], function (expressions) {
    return {
	NameParselet : function () {
	    this.parse = function (parser, token) {
		return new expressions.NameExpression(token);
	    }
	},
	PrefixOperatorParselet: function () {
	    this.parse = function (parser, token) {
		var operand = parser.parseExpression();
		return new expressions.PrefixExpression(token, operand);
	    }
	},
	BinaryOperatorParselet: function () {
	    this.parse = function (parser, leftExpr, token) {
		var rightExpr = parser.parseExpression();
		return new expressions.OperatorExpression(leftExpr, token, rightExpr);
	    }
	}
    }
});