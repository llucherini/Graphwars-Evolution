define({
    NameExpression: function (token) {
	this.name = token.text;
	
	this.toString = function() {
	    return this.name;
	}
    },
    PrefixExpression: function (token, rightExpr) {
	this.toString = function () {
	    return "(" + token.text + " " + rightExpr.toString() + ")";
	}
    },
    OperatorExpression: function (leftExpr, token, rightExpr) {
	this.toString = function () {
	    return "(" + leftExpr.toString() + " " + token.text + " " + rightExpr.toString() + ")";
	}
    }
});