define(["./lexer", "./parser", "./parselets", "./precedence"], 
       function (Lexer, Parser, parselets, precedence) {
	   return function () {

	       var prefix = function (parser, tokenType, precedence) {
		   parser.registerPrefix(tokenType, new parselets.PrefixOperatorParselet(precedence));
	       }
	
	       var inflixLeft = function (parser, tokenType, precedence) {
		   parser.registerInflix(tokenType, new parselets.BinaryOperatorParselet(precedence, false));
	       }
	
	       this.parse = function (expression) {
		   var lexer = Lexer(expression);
		   var parser = Parser(lexer);
		   
		   parser.registerPrefix("NAME", new parselets.NameParselet());
		   parser.registerPrefix("LPAREN", new parselets.GroupParselet());
		   parser.registerInflix("LPAREN", new parselets.CallParselet());
		   prefix(parser, "PLUS", precedence.PREFIX);
		   prefix(parser, "MINUS", precedence.PREFIX);
		   
		   inflixLeft(parser, "PLUS", precedence.SUM);
		   inflixLeft(parser, "MINUS", precedence.SUM);
		   inflixLeft(parser, "MULT", precedence.PRODUCT);
		   inflixLeft(parser, "DIV", precedence.PRODUCT);
		   
		   return parser.parseExpression();
	       }
	   }
       });