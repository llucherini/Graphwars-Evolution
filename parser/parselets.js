define(["./expressions", "./precedence"], function (Expressions, Precedence) {
    return {
	NameParselet : function () {
	    this.parse = function (parser, token) {
		return new Expressions.NameExpression(token);
	    }

	    return this;
	},
	PrefixOperatorParselet: function (precedence) {
	    this.precedence = precedence;

	    this.parse = function (parser, token) {
		var operand = parser.parseExpressionWithPrecedence(precedence);
		return new Expressions.PrefixExpression(token, operand);
	    }

	    return this;
	},
	BinaryOperatorParselet: function (precedence, isRight) {
	    this.precedence = precedence;

	    this.parse = function (parser, leftExpr, token) {
		var rightExpr = parser.parseExpressionWithPrecedence(precedence - (isRight ? 1 : 0));
		return new Expressions.OperatorExpression(leftExpr, token, rightExpr);
	    }

	    return this;
	},
	GroupParselet: function () {
	    this.parse = function (parser, token) {
		var expr = parser.parseExpression();
		parser.consume("RPAREN");
		return expr;
	    }

	    return this;
	},
	CallParselet: function () {
	    this.precedence = Precedence.CALL;
	    this.parse = function (parser, leftExpr, token) {
		var args = [];
		if (!parser.match("RPAREN")) {
		    do {
			args.push(parser.parseExpression());
		    } while (parser.match("COMMA"));
		    parser.consume("RPAREN");
		}

		return new Expressions.CallExpression(leftExpr, args);
	    }

	    return this;
	}
    }
});