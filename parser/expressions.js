define({
    NameExpression: function (token) {
	this.name = token.text;
	
	this.toString = function() {
	    return this.name;
	}

	return this;
    },
    PrefixExpression: function (token, rightExpr) {
	this.toString = function () {
	    return "(" + token.text + " " + rightExpr.toString() + ")";
	}

	return this;
    },
    OperatorExpression: function (leftExpr, token, rightExpr) {
	this.toString = function () {
	    return "(" + leftExpr.toString() + " " + token.text + " " + rightExpr.toString() + ")";
	}

	return this;
    },
    CallExpression: function(leftExpr, args) {
	this.toString = function () {
	    var ret = leftExpr.toString() + "(";
	    for(var i=0; i<args.length; i++) {
		ret += args[i].toString();
	    }
	    return  ret + ")";
	}

	return this;
    }
});