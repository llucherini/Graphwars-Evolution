define(["./tokens", "./lexer", "./parselets"], function (tokens, lexer, parselets) {
    return {
	Parser : function (lexer) {
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

	    var consume = function () {
		lookahead(0);

		return read.shift();
	    }

	    this.parseExpression = function () {
		var token = consume();
		var prefix = prefixParselets[token.type];

		if(!prefix) {
		    throw 'Could not parse "' + token.text + '".';
		}

		var leftExpr = prefix.parse(this, token);

		token = consume();
		var inflix = inflixParselets[token.type];

		if (!inflix) {
		    // No inflix expression, return
		    return leftExpr;
		}

		return inflix.parse(this, leftExpr, token);
	    }
	    
	    this.registerPrefix = function (tokenType, parselet) {
		prefixParselets[tokenType] = parselet;
	    }

	    this.registerInflix = function (tokenType, parselet) {
		inflixParselets[tokenType] = parselet;
	    }

	    this.prefix = function (tokenType) {
		prefixParselets[tokenType] = new parselets.PrefixOperatorParselet();
	    }

	    this.inflix = function (tokenType) {
		inflixParselets[tokenType] = new parselets.BinaryOperatorParselet();
	    }
	}
    }
});