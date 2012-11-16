define(function() {
    return function (lexer) {
	
	var tokens = lexer;
	var read = [];
	var prefixParselets = {};
	var inflixParselets = {};
	
	var lookahead = function(distance) {
	    while(distance >= read.length) {
		read.push(tokens.next());
	    }
	    
	    return read[distance];
	}
	
	this.consumeExpected = function (expectedTokenType) {
	    var token = lookahead(0);
	    if (token.type != expectedTokenType) {
		throw "Expected token " + expectedTokenType + " but found " + token.type;
	    }

	    return consume();
	}

	this.consume = function () {
	    lookahead(0);
	    
	    return read.shift();
	}
	
	var getPrecedence = function () {
	    var parselet = inflixParselets[lookahead(0).type];
	    if (parselet != null) {
		return parselet.precedence;
	    }
	    
	    return 0;
	}

	this.match = function(expectedTokenType) {
	    var token = lookahead(0);
	    if (token.type != expectedTokenType) {
		return false;
	    }
	    
	    consume();
	    return true;
	}

	this.parseExpressionWithPrecedence = function (precedence) {
	    var token = consume();
	    var prefix = prefixParselets[token.type];

	    if(!prefix) {
		throw 'Could not parse "' + token.text + '".';
	    }
	    
	    var leftExpr = prefix.parse(this, token);

	    while (precedence < getPrecedence()) {
		token = consume();
		var inflix = inflixParselets[token.type];
		leftExpr = inflix.parse(this, leftExpr, token);
	    }
	    
	    return leftExpr;
	}
	
	this.parseExpression = function() {
	    return this.parseExpressionWithPrecedence(0);
	}
	
	this.registerPrefix = function (tokenType, parselet) {
	    prefixParselets[tokenType] = parselet;
	}
	
	this.registerInflix = function (tokenType, parselet) {
	    inflixParselets[tokenType] = parselet;
	}

	return this;
    }	
});